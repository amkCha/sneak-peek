package circuits

import (
	"testing"

	"github.com/ChatelainSys/SneakPeek/backend/crypto/merkleization"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark-crypto/ecc/bn254/fr"
	"github.com/consensys/gnark/backend"
	"github.com/consensys/gnark/backend/groth16"
	"github.com/consensys/gnark/frontend"
	"github.com/stretchr/testify/assert"
)

func TestFullLoop(t *testing.T) {
	// Make sure the init is run
	trades := mockedData(N_TRADES)
	proof := GenerateProof(trades, 10)
	check := VerifyProof(proof, "ignored-string", 10)
	assert.True(t, check, "Boom")

}

func TestCircuit(t *testing.T) {

	assert := groth16.NewAssert(t)

	// *** TO be done at the starting time
	// *** This is an initialization stuff - No data comes into this
	// *** But we need to know how many check we do etc...
	// Compiles the circuit and run the generator
	nTrades := 32
	circuit := Allocate(nTrades)
	r1cs, err := frontend.Compile(ecc.BN254, backend.GROTH16, &circuit)
	if err != nil {
		panic(err)
	}

	// We create the mock data, so that it should satisfy the circuit
	trades := mockedData(nTrades)
	merkleized := merkleization.MerkleizeTrades(trades)
	var threshold fr.Element
	threshold.SetString("10")
	root := merkleized.Tree.Root()

	witness := Allocate(nTrades)
	witness.Assign(trades, threshold, root)

	assert.ProverSucceeded(r1cs, &witness)
}
