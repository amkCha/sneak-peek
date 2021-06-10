package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	tradesCollection = "trades"
)

type DB struct {
	client *mongo.Database
}

type IntraDayTrade struct {
	ID   primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Day  uint               `bson:"day" json:"day"`
	Buy  string             `bson:"buy" json:"buy"`
	Sell string             `bson:"sell" json:"sell"`
}

func NewClient(database string, opt *options.ClientOptions) (*DB, error) {
	client, err := mongo.NewClient(opt)
	if err != nil {
		return nil, err
	}

	_ = client.Connect(context.Background())

	c := client.Database(database)
	return &DB{
		client: c,
	}, nil
}

type Trades struct {
	Day  int64
	Buy  string
	Sell string
}

func (d *DB) GetIntraDayTrades(ctx context.Context) ([]Trades, error) {
	tradesCollection := d.client.Collection(tradesCollection)

	findOptions := options.Find()
	findOptions.SetSort(bson.D{{"day", 1}})

	cur, err := tradesCollection.Find(ctx, &bson.M{}, findOptions)
	if err != nil {
		return nil, err
	}

	var balances []bson.M
	if err = cur.All(ctx, &balances); err != nil {
		log.Fatal(err)
	}

	var trades []Trades
	for _, trade := range balances {
		trades = append(trades, Trades{
			Day:  trade["day"].(int64),
			Buy:  trade["buy"].(string),
			Sell: trade["sell"].(string),
		})
	}

	return trades, nil
}
