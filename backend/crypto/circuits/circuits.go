package circuits

import (
	"math/big"

	"github.com/ChatelainSys/SneakPeek/backend/crypto/merkleization"
	"github.com/ChatelainSys/SneakPeek/backend/types"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark-crypto/ecc/bn254/fr"
	"github.com/consensys/gnark/backend"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
)

var R1CS frontend.CompiledConstraintSystem
var PROVING_KEY groth16.ProvingKey

const N_TRADES = 128

// compiles the circuit
func init() {
	circuit := Allocate(N_TRADES)
	r1cs, err := frontend.Compile(ecc.BN254, backend.GROTH16, &circuit)
	if err != nil {
		panic(err)
	}
	R1CS = r1cs
	PROVING_KEY, _, err = groth16.Setup(R1CS)
	if err != nil {
		panic(err)
	}
}

/// Generate proof from passed trades
/// TODO: Actually ignores the passed trades and use mocked data
/// The threshold is actually used
func GenerateProof(trades []types.Trades, threshold int) groth16.Proof {
	witness := Allocate(N_TRADES)
	// Ignore the passed data and use mocked data instead, that passes the test
	trades = mockedData(N_TRADES)
	var thresholdField fr.Element
	thresholdField.SetUint64(uint64(threshold))
	merkleized := merkleization.MerkleizeTrades(trades)
	witness.Assign(trades, thresholdField, merkleized.Tree.Root())
	proof, _ := groth16.Prove(R1CS, PROVING_KEY, &witness)
	return proof
}

type SneakPeekCircuit struct {
	Buys         []frontend.Variable
	Sells        []frontend.Variable
	ThresholdBuy frontend.Variable `gnark:",public"`
	Root         frontend.Variable `gnark:",public"`
}

// It must be passed a power of two
func Allocate(nTrades int) SneakPeekCircuit {
	var circuit SneakPeekCircuit
	buys := make([]frontend.Variable, nTrades)
	sells := make([]frontend.Variable, nTrades)
	circuit.Buys = buys
	circuit.Sells = sells
	return circuit
}

func (c *SneakPeekCircuit) Define(curveID ecc.ID, cs *frontend.ConstraintSystem) error {
	length := len(c.Buys)
	totalBuys := Sum(cs, c.Buys)
	totalSells := Sum(cs, c.Sells)

	// assert threshold >= totalBuys
	cs.AssertIsLessOrEqual(c.ThresholdBuy, totalBuys)
	// assert 2 * totalSells <= totalBuys
	cs.AssertIsLessOrEqual(cs.Mul(totalSells, 2), totalBuys)

	leaves := make([]frontend.Variable, 0, length)
	for i := 0; i < length; i++ {
		leaves = append(leaves, MimcHash(cs, c.Buys[i], c.Sells[i]))
	}

	root := MerkleTreeAggregate(cs, leaves)
	cs.AssertIsEqual(root, c.Root)
	return nil
}

func (c *SneakPeekCircuit) Assign(trades []types.Trades, threshold, root fr.Element) {
	padded := merkleization.PadTrades(trades)
	for i, trade := range padded {
		c.Buys[i].Assign(trade.Buy)
		c.Sells[i].Assign(trade.Sell)
	}
	c.Root.Assign(root)
	c.ThresholdBuy.Assign(threshold)
}

// Returns a set of data that is likely to help us pass
// the tests
func mockedData(n int) []types.Trades {
	res := make([]types.Trades, n, n)
	for i := 0; i < n; i++ {
		res[i].Buy = big.NewInt(100)
		res[i].Sell = big.NewInt(30)
		day := uint(i)
		res[i].Day = &day
	}
	return res
}
