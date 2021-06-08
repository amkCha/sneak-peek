package main

import (
	"context"
	// "flag"
	"log"
	"math/big"
	"os"

	// "os/signal"
	// "strings"
	// "sync"
	// "syscall"

	// "github.com/ChatelainSys/SneakPeek/types"
	// "github.com/Shopify/sarama"
	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	ethrpc "github.com/ethereum/go-ethereum/rpc"
	// "github.com/golang/protobuf/proto"
)

// Sarama configuration options
// var (
// 	brokers  = ""
// 	version  = ""
// 	group    = ""
// 	topics   = ""
// 	assignor = ""
// 	username = ""
// 	password = ""
// 	oldest   = true
// 	verbose  = false
// )

// func init() {
// 	flag.StringVar(&brokers, "brokers", "", "Kafka bootstrap brokers to connect to, as a comma separated list")
// 	flag.StringVar(&group, "group", "", "Kafka consumer group definition")
// 	flag.StringVar(&version, "version", "2.1.1", "Kafka cluster version")
// 	flag.StringVar(&topics, "topics", "", "Kafka topics to be consumed, as a comma separated list")
// 	flag.StringVar(&assignor, "assignor", "range", "Consumer group partition assignment strategy (range, roundrobin, sticky)")
// 	flag.StringVar(&username, "username", "", "Kafka username")
// 	flag.StringVar(&password, "password", "", "Kafka password")
// 	flag.BoolVar(&oldest, "oldest", true, "Kafka consumer consume initial offset from oldest")
// 	flag.BoolVar(&verbose, "verbose", false, "Sarama logging")
// 	flag.Parse()

// 	if len(brokers) == 0 {
// 		panic("no Kafka bootstrap brokers defined, please set the -brokers flag")
// 	}

// 	if len(topics) == 0 {
// 		panic("no topics given to be consumed, please set the -topics flag")
// 	}

// 	if len(group) == 0 {
// 		panic("no Kafka consumer group defined, please set the -group flag")
// 	}
// }

// func Unmarshal(buf []byte, pb proto.Message) error {
// 	// Unmarshal
// 	err := proto.Unmarshal(buf, pb)
// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }

// func main() {
// 	log.Println("Starting a new Sarama consumer")

// 	if verbose {
// 		sarama.Logger = log.New(os.Stdout, "[sarama] ", log.LstdFlags)
// 	}

// 	version, err := sarama.ParseKafkaVersion(version)
// 	if err != nil {
// 		log.Panicf("Error parsing Kafka version: %v", err)
// 	}

// 	/**
// 	 * Construct a new Sarama configuration.
// 	 * The Kafka cluster version has to be defined before the consumer/producer is initialized.
// 	 */
// 	config := sarama.NewConfig()
// 	config.Version = version
// 	config.Net.SASL.User = username
// 	config.Net.SASL.Password = password
// 	config.Net.SASL.Enable = true
// 	config.Net.SASL.Mechanism = sarama.SASLTypePlaintext

// 	switch assignor {
// 	case "sticky":
// 		config.Consumer.Group.Rebalance.Strategy = sarama.BalanceStrategySticky
// 	case "roundrobin":
// 		config.Consumer.Group.Rebalance.Strategy = sarama.BalanceStrategyRoundRobin
// 	case "range":
// 		config.Consumer.Group.Rebalance.Strategy = sarama.BalanceStrategyRange
// 	default:
// 		log.Panicf("Unrecognized consumer group partition assignor: %s", assignor)
// 	}

// 	if oldest {
// 		config.Consumer.Offsets.Initial = sarama.OffsetOldest
// 	}

// 	/**
// 	 * Setup a new Sarama consumer group
// 	 */
// 	consumer := Consumer{
// 		ready: make(chan bool),
// 	}

// 	ctx, cancel := context.WithCancel(context.Background())
// 	client, err := sarama.NewConsumerGroup(strings.Split(brokers, ","), group, config)
// 	if err != nil {
// 		log.Panicf("Error creating consumer group client: %v", err)
// 	}

// 	wg := &sync.WaitGroup{}
// 	wg.Add(1)
// 	go func() {
// 		defer wg.Done()
// 		for {
// 			// `Consume` should be called inside an infinite loop, when a
// 			// server-side rebalance happens, the consumer session will need to be
// 			// recreated to get the new claims
// 			if err := client.Consume(ctx, strings.Split(topics, ","), &consumer); err != nil {
// 				log.Panicf("Error from consumer: %v", err)
// 			}
// 			// check if context was cancelled, signaling that the consumer should stop
// 			if ctx.Err() != nil {
// 				return
// 			}
// 			consumer.ready = make(chan bool)
// 		}
// 	}()

// 	<-consumer.ready // Await till the consumer has been set up
// 	log.Println("Sarama consumer up and running!...")

// 	sigterm := make(chan os.Signal, 1)
// 	signal.Notify(sigterm, syscall.SIGINT, syscall.SIGTERM)
// 	select {
// 	case <-ctx.Done():
// 		log.Println("terminating: context cancelled")
// 	case <-sigterm:
// 		log.Println("terminating: via signal")
// 	}
// 	cancel()
// 	wg.Wait()
// 	if err = client.Close(); err != nil {
// 		log.Panicf("Error closing client: %v", err)
// 	}
// }

// // Consumer represents a Sarama consumer group consumer
// type Consumer struct {
// 	ready chan bool
// }

// // Setup is run at the beginning of a new session, before ConsumeClaim
// func (consumer *Consumer) Setup(sarama.ConsumerGroupSession) error {
// 	// Mark the consumer as ready
// 	close(consumer.ready)
// 	return nil
// }

// // Cleanup is run at the end of a session, once all ConsumeClaim goroutines have exited
// func (consumer *Consumer) Cleanup(sarama.ConsumerGroupSession) error {
// 	return nil
// }

// // ConsumeClaim must start a consumer loop of ConsumerGroupClaim's Messages().
// func (consumer *Consumer) ConsumeClaim(session sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {
// 	// NOTE:
// 	// Do not move the code below to a goroutine.
// 	// The `ConsumeClam` itself is called within a goroutine, see:
// 	// https://github.com/Shopify/sarama/blob/master/consumer_group.go#L27-L29
// 	for message := range claim.Messages() {
// 		resp := &types.TxResponse{}

// 		_ = Unmarshal(message.Value, resp)
// 		log.Printf("%v \n", resp.Transaction)

// 		session.MarkMessage(message, "")
// 	}

// 	return nil
// }

var (
	infuraAddress = os.Getenv("INFURA_MAINNET_ENDPOINT")
)

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
	// to be checked
	// return append(common.FromHex("0x70a08231000000000000000000000000"), common.FromHex(cc.walletAddress)...)
	return common.FromHex("0x70a08231000000000000000000000000b1adceddb2941033a090dd166a462fe1c2029484")
}

func (cc *CallingContract) callRPC(blockNumber uint64) *big.Int {
	return nil
}

func (cc *CallingContract) GetBalance(blockNumber uint64) (*big.Int, error) {
	if balance, ok := cc.cache[blockNumber]; ok {
		return balance, nil
	}

	// TODO:
	// Call Infura Archive
	// Set cache
	// And return balance

	toAddr := common.HexToAddress(cc.tokenAddress)
	message := ethereum.CallMsg{
		To:   &toAddr,
		Data: cc.balanceOfBytecode(),
	}

	result, err := cc.ethrpc.CallContract(context.Background(), message, big.NewInt(int64(blockNumber)))
	if err != nil {
		return big.NewInt(1), err
	}

	balance := new(big.Int)
	return balance.SetBytes(result), nil
}

type Caller func(blockNumber uint64) (*big.Int, error)

type Change struct {
	BlockNumber uint64
	Old         *big.Int
	New         *big.Int
}

func GetChanges(start, end, skip uint64, cllr Caller) []*Change {
	var oldBalance *big.Int
	var newBalance *big.Int
	// Initialization
	if end == start+1 {
		oldBalance, _ = cllr(start)
		newBalance, _ = cllr(end)
		if newBalance != oldBalance {
			return []*Change{&Change{BlockNumber: end, Old: oldBalance, New: newBalance}}
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
			changes = append(changes, GetChanges(oldi, newi, skip/10, cllr)...)
		}

		if newi == end {
			break
		}

		oldi = newi
		newi = newi + skip
	}

	return changes
}

func main() {
	tokenAddr := "0x169f74ab056527caa77d09d27ac54b58afffe2ba"
	walletAddr := "0xB1AdceddB2941033a090dD166a462fe1c2029484"

	caller, err := NewCallingContract(infuraAddress, tokenAddr, walletAddr)

	if err != nil {
		log.Panicf("Error instantiating new calling contract: %v", err)
	}

	// blockStart := uint64(11865000)
	blockStart := uint64(12544500)
	blockEnd := uint64(12545015)
	changes := GetChanges(blockStart, blockEnd, 100, caller.GetBalance)

	// TODO:
	// save changes
	for _, change := range changes {
		log.Println("Result of the balance changes %v \n", change)
	}
}
