package circuits

import "github.com/consensys/gnark/frontend"

// MerkleTreeAggregate returns the result of the hashing function
func Sum(cs *frontend.ConstraintSystem, v []frontend.Variable) frontend.Variable {
	res := cs.Constant(0)
	for _, x := range v {
		res = cs.Add(res, x)
	}
	return res
}
