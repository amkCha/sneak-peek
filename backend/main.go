package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/ChatelainSys/SneakPeek/backend/db"
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
		log.Printf("%v\n", res)
		c.JSON(http.StatusOK, gin.H{"proof": "ok"})
	}
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	fmt.Println(db.StaticTrades)
	hand := &Handlers{DB: InitDB()}

	r.POST("/build-proof", hand.buildProof)

	_ = r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
