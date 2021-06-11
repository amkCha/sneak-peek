package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"os"

	"github.com/ChatelainSys/SneakPeek/backend/crypto/circuits"
	"github.com/ChatelainSys/SneakPeek/backend/db"
	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark/backend/groth16"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitDB() *db.DB {
	addr := os.Getenv("DB_ADDRESS")
	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")

	opt := options.Client().ApplyURI(fmt.Sprintf("mongodb+srv://%s:%s@%s?retryWrites=true&w=majority", username, password, addr))
	d, err := db.NewClient("sneak-peek", opt)
	if err != nil {
		fmt.Println(err)
	}

	return d
}

type Handlers struct {
	DB *db.DB
}

func (h *Handlers) buildProof(c *gin.Context) {

	var json struct {
		TokenAddress  string `json:"tokenAddress" binding:"required"`
		WalletAddress string `json:"walletAddress" binding:"required"`
	}

	if c.Bind(&json) == nil {
		res, _ := h.DB.GetIntraDayTrades(context.Background())
		proof := circuits.GenerateProof(res, 100)
		var buf bytes.Buffer
		_, _ = proof.WriteTo(&buf)

		c.JSON(http.StatusOK, gin.H{"proof": fmt.Sprintf("%v", base64.StdEncoding.EncodeToString(buf.Bytes()))})
	}
}

func (h *Handlers) verifyProof(c *gin.Context) {

	var json struct {
		Proof string `json:"proof"`
	}

	if c.Bind(&json) == nil {
		proofBytes, _ := base64.StdEncoding.DecodeString(json.Proof)
		proof := groth16.NewProof(ecc.BN254)
		_, _ = proof.ReadFrom(bytes.NewReader(proofBytes))
		isTrue := circuits.VerifyProof(proof, "", 100)

		c.JSON(http.StatusOK, gin.H{"verify": isTrue})
	}
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	hand := &Handlers{DB: InitDB()}

	r.POST("/build-proof", hand.buildProof)
	r.POST("/verify-proof", hand.verifyProof)

	_ = r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
