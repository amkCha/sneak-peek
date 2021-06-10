package merkleization

import (
	mimc "github.com/ChatelainSys/SneakPeek/crypto/hash"
	"github.com/consensys/gnark-crypto/ecc/bn254/fr"
)

const SEED string = "helloworld"

// len is the number of bits we expect to retrieve from x
// The bits are returned from small to large
func bitDecompose(x uint, len int) []bool {

	// If x is larger we panic.
	if x > 1<<len {
		panic("X larger than len")
	}

	res := make([]bool, 0, len)
	for i := 0; i < len; i++ {
		bit := (x&1 == 1)
		x = x >> 1
		res = append(res, bit)
	}

	return res
}

type MerkleProof struct {
	// Position of the leaf being proven
	Index uint
	// Neighbours of the leaf node in the proof
	// The first elements represent the leaf level, and latest
	// are the one higher in the tree
	Neighbours []fr.Element
}

func (m *MerkleProof) Verify(leaf, root *fr.Element) bool {
	bits := bitDecompose(m.Index, len(m.Neighbours))
	current := *leaf
	for i := range bits {
		neighbour := m.Neighbours[i]
		if bits[i] {
			newCurrent := mimc.MimcHash(neighbour, current)
			current = newCurrent
		} else {
			newCurrent := mimc.MimcHash(current, neighbour)
			current = newCurrent
		}
	}
	return current == *root
}
