package merkleization

import (
	"testing"

	"github.com/consensys/gnark-crypto/ecc/bn254/fr"
	"github.com/stretchr/testify/assert"
)

func TestBitDecompose(t *testing.T) {
	expected := []bool{true, false, false}
	assert.Equal(t, expected, bitDecompose(1, 3), "Boom")

}

func TestMerkleTree(t *testing.T) {
	nLeaves := 4
	leafNum := 2
	nLevels := 3

	leaves := make([]fr.Element, nLeaves)
	for i := 0; i < nLeaves; i++ {
		leaves[i].SetUint64(uint64(i))
	}

	tree := TreeFromLeaves(leaves)
	assert.Equal(t, len(tree.levels), nLevels, "Boom")

	leaf := leaves[leafNum]
	expectedRoot := tree.Root()
	proof := tree.ProveMembership(uint(leafNum))

	assert.True(t, proof.Verify(&leaf, &expectedRoot), "Boom")
}
