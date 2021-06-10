package circuits

import (
	"github.com/consensys/gnark/frontend"
)

// MerkleTreeAggregate returns the result of the hashing function
func MerkleTreeAggregate(cs *frontend.ConstraintSystem, leaves []frontend.Variable) frontend.Variable {
	currentLevel := leaves
	for {
		if len(currentLevel) == 1 {
			break
		}
		currentLevel = computeNextLevel(cs, currentLevel)
	}
	return currentLevel[0]
}

func computeNextLevel(cs *frontend.ConstraintSystem, level []frontend.Variable) []frontend.Variable {
	nextLevel := make([]frontend.Variable, 0, len(level)/2)
	for i := 0; i < len(level)/2; i++ {
		newVal := MimcHash(cs, level[2*i], level[2*i+1])
		nextLevel = append(nextLevel, newVal)
	}
	return nextLevel
}
