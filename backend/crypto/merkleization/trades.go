package merkleization

import (
	mimc "github.com/ChatelainSys/SneakPeek/backend/crypto/hash"
	"github.com/ChatelainSys/SneakPeek/backend/types"
	"github.com/consensys/gnark-crypto/ecc/bn254/fr"
)

type MerkleizedTrades struct {
	Elements []types.Trades
	Tree     MerkleTree
}

func ArithmetizeTrades(t *types.Trades) []fr.Element {
	// We only keep the buy and sells, the timestamps
	// <=>
	// the position in the merkletree
	res := make([]fr.Element, 2)
	res[0].SetUint64(t.Buy.Uint64())
	res[1].SetUint64(t.Sell.Uint64())
	return res
}

func HashTrades(t *types.Trades) fr.Element {
	arith := ArithmetizeTrades(t)
	return mimc.MimcHash(arith...)
}

func MerkleizeTrades(trades []types.Trades) MerkleizedTrades {
	leaves := make([]fr.Element, len(trades))
	for i, t := range trades {
		leaves[i] = HashTrades(&t)
	}
	tree := TreeFromLeaves(leaves)
	return MerkleizedTrades{
		Elements: trades,
		Tree:     tree,
	}
}

// Pad to the next power of two
func PadTrades(trades []types.Trades) []types.Trades {
	paddedLen := nextPowerOf2(len(trades))
	padded := make([]types.Trades, paddedLen)
	copy(padded, trades)
	return padded
}

func nextPowerOf2(x int) int {
	current := x
	res := 1
	for {
		if current == 1 {
			return res
		}
		res = res << 1
		current = current >> 1
	}
}

func isPowerOf2(x uint) bool {
	return (x&(x-1)) == 0 && x != 0
}
