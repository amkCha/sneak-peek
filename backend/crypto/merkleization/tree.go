package merkleization

import (
	mimc "github.com/ChatelainSys/SneakPeek/crypto/hash"
	"github.com/consensys/gnark-crypto/ecc/bn254/fr"
)

type MerkleTree struct {
	// Leafs are in level 0. The larger level, the higher in the tree
	levels [][]fr.Element
}

func (t *MerkleTree) Root() fr.Element {
	return t.levels[len(t.levels)-1][0]
}

func (t *MerkleTree) ProveMembership(leafNum uint) MerkleProof {
	current := leafNum
	levels := make([]fr.Element, 0, len(t.levels))
	// We skip the last level because it contains the root
	for _, level := range t.levels[:len(t.levels)-1] {
		neighbour := level[current^1]
		current = current >> 1
		levels = append(levels, neighbour)
	}
	return MerkleProof{Index: leafNum, Neighbours: levels}
}

// We assume the leaves are passed as a power of two length slice
func TreeFromLeaves(leaves []fr.Element) MerkleTree {
	levels := make([][]fr.Element, 0, 10)
	current := leaves

	for {
		lastIteration := len(current) == 1
		levels = append(levels, current)
		current = computeNextLevel(current)
		if lastIteration {
			break
		}
	}

	return MerkleTree{levels: levels}
}

func computeNextLevel(level []fr.Element) []fr.Element {
	nextLevel := make([]fr.Element, 0, len(level)/2)
	for i := 0; i < len(level)/2; i++ {
		newVal := mimc.MimcHash(level[2*i], level[2*i+1])
		nextLevel = append(nextLevel, newVal)
	}
	return nextLevel
}
