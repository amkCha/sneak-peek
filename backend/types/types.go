package types

import (
	"math/big"
)

type Caller func(blockNumber uint64) (*big.Int, error)

type Change struct {
	BlockNumber uint64
	Old         *big.Int
	New         *big.Int
}
type Trades struct {
	Day  *uint
	Buy  *big.Int
	Sell *big.Int
}
