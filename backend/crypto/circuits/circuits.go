package circuits

import (
	"github.com/ChatelainSys/SneakPeek/backend/crypto/merkleization"
	"github.com/ChatelainSys/SneakPeek/backend/types"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark-crypto/ecc/bn254/fr"
	"github.com/consensys/gnark/frontend"
)

type SneakPeekCircuit struct {
	buys         []frontend.Variable
	sells        []frontend.Variable
	ThresholdBuy frontend.Variable
	Root         frontend.Variable
}

// It must be passed a power of two
func Allocate(nTrades int) SneakPeekCircuit {
	buys := make([]frontend.Variable, nTrades)
	sells := make([]frontend.Variable, nTrades)
	return SneakPeekCircuit{
		buys:  buys,
		sells: sells,
	}
}

func (c *SneakPeekCircuit) Define(curveID ecc.ID, cs *frontend.ConstraintSystem) error {
	length := len(c.buys)
	totalBuys := Sum(cs, c.buys)
	totalSells := Sum(cs, c.sells)

	// assert threshold >= totalBuys
	cs.AssertIsLessOrEqual(c.ThresholdBuy, totalBuys)
	// assert 2 * totalSells <= totalBuys
	cs.AssertIsLessOrEqual(cs.Mul(totalSells, 2), totalBuys)

	leaves := make([]frontend.Variable, 0, length)
	for i := 0; i < length; i++ {
		leaves = append(leaves, MimcHash(cs, c.buys[i], c.sells[i]))
	}

	root := MerkleTreeAggregate(cs, leaves)
	cs.AssertIsEqual(root, c.Root)
	return nil
}

func (c *SneakPeekCircuit) Assign(trades []types.Trades, threshold int, root fr.Element) {
	padded := merkleization.PadTrades(trades)
	for i, trade := range padded {
		c.buys[i].Assign(trade.Buy)
		c.sells[i].Assign(trade.Sell)
	}
	c.Root.Assign(root)
	c.ThresholdBuy.Assign(threshold)
}
