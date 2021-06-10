package hash

import (
	"testing"

	"github.com/consensys/gnark-crypto/ecc/bn254/fr"
)

func TestHashes(t *testing.T) {
	inputs := make([]fr.Element, 100)
	MimcHash(inputs...)
}
