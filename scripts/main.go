package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"math/big"
	"os"

	"github.com/ChatelainSys/SneakPeek/scripts/db"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	ethrpc "github.com/ethereum/go-ethereum/rpc"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	exec          = ""
	infuraAddress = os.Getenv("INFURA_MAINNET_ENDPOINT")
	tokenAddr     = "0x514910771af9ca656af840dff83e8264ecf986ca"
	walletAddr    = "0xB1AdceddB2941033a090dD166a462fe1c2029484"
)

func init() {
	flag.StringVar(&exec, "exec", "", "type of exec")
	flag.Parse()
}

type CallingContract struct {
	tokenAddress  string
	walletAddress string

	ethrpc *ethclient.Client

	cache map[uint64]*big.Int
}

func NewCallingContract(infuraAddr string, tokenAddress, walletAddress string) (*CallingContract, error) {
	c, err := ethrpc.DialHTTP(infuraAddr)
	if err != nil {
		return nil, err
	}

	return &CallingContract{
		ethrpc:        ethclient.NewClient(c),
		tokenAddress:  tokenAddress,
		walletAddress: walletAddress,
		cache:         make(map[uint64]*big.Int),
	}, nil
}

func (cc *CallingContract) balanceOfBytecode() []byte {
	return common.FromHex("0x70a08231000000000000000000000000b1adceddb2941033a090dd166a462fe1c2029484")
}

func (cc *CallingContract) GetBalance(blockNumber uint64) (*big.Int, error) {
	if balance, ok := cc.cache[blockNumber]; ok {
		return balance, nil
	}

	toAddr := common.HexToAddress(cc.tokenAddress)
	message := ethereum.CallMsg{
		To:   &toAddr,
		Data: cc.balanceOfBytecode(),
	}

	result, err := cc.ethrpc.CallContract(context.Background(), message, big.NewInt(int64(blockNumber)))
	if err != nil {
		return big.NewInt(1), err
	}

	balance := new(big.Int).SetBytes(result)
	cc.cache[blockNumber] = balance
	return balance, nil
}

type Caller func(blockNumber uint64) (*big.Int, error)

type Change struct {
	BlockNumber uint64
	Old         *big.Int
	New         *big.Int
}

func getChanges(start, end, skip uint64, cllr Caller, d *db.DB) []*Change {
	var oldBalance *big.Int
	var newBalance *big.Int
	// Initialization
	if end == start+1 {
		oldBalance, _ = cllr(start)
		newBalance, _ = cllr(end)
		if newBalance.Cmp(oldBalance) != 0 {
			_ = d.AddBalance(context.Background(), db.BalanceRecord{
				BlockNumber: end,
				TokenAddr:   tokenAddr,
				WalletAddr:  walletAddr,
				NewBalance:  newBalance.String(),
				OldBalance:  oldBalance.String(),
			})

			return []*Change{{BlockNumber: end, Old: oldBalance, New: newBalance}}
		} else {
			return nil
		}
	}

	// Recursive
	var changes []*Change
	oldi := start
	newi := start + skip
	oldBalance, _ = cllr(start)
	for {
		if newi > end {
			newi = end
		}

		newBalance, _ := cllr(newi)

		if newBalance.Cmp(oldBalance) != 0 {
			changes = append(changes, getChanges(oldi, newi, skip/10, cllr, d)...)
		}

		if newi == end {
			break
		}

		oldi = newi
		newi = newi + skip
	}

	return changes
}

func InitDB() *db.DB {
	addr := os.Getenv("DB_ADDRESS")
	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")

	opt := options.Client().ApplyURI(fmt.Sprintf("mongodb+srv://%s:%s@%s?retryWrites=true&w=majority", username, password, addr))
	d, err := db.NewClient("sneak-peek", opt)
	if err != nil {
		fmt.Println(err)
	}

	return d
}

func importData() {
	caller, err := NewCallingContract(infuraAddress, tokenAddr, walletAddr)

	if err != nil {
		log.Panicf("Error instantiating new calling contract: %v", err)
	}

	blockStart := uint64(11565000)
	blockEnd := uint64(12545015)

	d := InitDB()
	_ = getChanges(blockStart, blockEnd, 1000, caller.GetBalance, d)
}

type Trades struct {
	Day  *uint
	Buy  *big.Int
	Sell *big.Int
}

func aggregate() {
	d := InitDB()

	changes, _ := d.GetBalance(context.Background())

	blockStart := int64(11565000)
	blockEnd := int64(12545015)
	blocksPerDay := int64(5700)

	BuySellTimeSeries := make([]Trades, (blockEnd-blockStart)/blocksPerDay)

	for _, change := range changes {
		day := (change["blockNumber"].(int64) - blockStart) / blocksPerDay
		newBalance, _ := (&big.Int{}).SetString(change["newBalance"].(string), 10)
		oldBalance, _ := (&big.Int{}).SetString(change["oldBalance"].(string), 10)
		delta := (&big.Int{}).Sub(newBalance, oldBalance)

		if delta.Cmp(big.NewInt(0)) > 0 {
			if BuySellTimeSeries[day].Buy == nil {
				BuySellTimeSeries[day].Buy = big.NewInt(0)
			}

			BuySellTimeSeries[day].Buy.Add(BuySellTimeSeries[day].Buy, delta)
		} else {
			if BuySellTimeSeries[day].Sell == nil {
				BuySellTimeSeries[day].Sell = big.NewInt(0)
			}

			BuySellTimeSeries[day].Sell.Add(BuySellTimeSeries[day].Sell, (&big.Int{}).Sub(oldBalance, newBalance))
		}

		BuySellTimeSeries[day].Day = &(&struct{ x uint }{uint(day)}).x
	}

	for i, trade := range BuySellTimeSeries {
		if trade.Day == nil {
			trade.Day = &(&struct{ x uint }{uint(i)}).x
		}
		if trade.Buy == nil {
			trade.Buy = big.NewInt(0)
		}
		if trade.Sell == nil {
			trade.Sell = big.NewInt(0)
		}

		_ = d.AddIntraDayTrade(context.Background(), db.IntraDayTrade{
			Day:  *trade.Day,
			Buy:  trade.Buy.String(),
			Sell: trade.Sell.String(),
		})
	}
}

func main() {
	switch exec {
	case "import":
		importData()
	default:
		aggregate()
	}
}
