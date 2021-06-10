package db

import (
	"context"
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	balancesCollection = "balances"
	tradesCollection = "trades"
)

type DB struct {
	client *mongo.Database
}

type BalanceRecord struct {
	ID    primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	BlockNumber uint64 `bson:"blockNumber" json:"blockNumber"`
	TokenAddr string `bson:"tokenAddr" json:"tokenAddr"`
	WalletAddr string `bson:"walletAddr" json:"walletAddr"`
	NewBalance string `bson:"newBalance" json:"newBalance"`
	OldBalance string `bson:"oldBalance" json:"oldBalance"`
}

type IntraDayTrade struct {
	ID    primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Day uint `bson:"day" json:"day"`
	Buy string `bson:"buy" json:"buy"`
	Sell string `bson:"sell" json:"sell"`
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

func (d *DB) AddBalance(ctx context.Context, record BalanceRecord) error  {
	balanceClient := d.client.Collection(balancesCollection)

	key := []byte(fmt.Sprintf("%d%s%s", record.BlockNumber, record.TokenAddr, record.WalletAddr))
	hasher := sha1.New()
	hasher.Write(key)
	id, _ := primitive.ObjectIDFromHex(hex.EncodeToString(hasher.Sum(nil)[:12]))

	record.ID = id

	opts := options.Update().SetUpsert(true)
	_, err := balanceClient.UpdateOne(ctx, bson.D{{"_id", record.ID}}, bson.D{{"$set", record}}, opts)
	return err
}

func (d *DB) GetBalance(ctx context.Context) ([]bson.M, error) {
	balanceClient := d.client.Collection(balancesCollection)

	findOptions := options.Find()
	findOptions.SetSort(bson.D{{"blockNumber", 1}})

	cur, err := balanceClient.Find(ctx, &bson.M{}, findOptions)
	if err != nil {
		return nil, err
	}

	var balances []bson.M
	if err = cur.All(ctx, &balances); err != nil {
		log.Fatal(err)
	}
	return balances, nil
}


func (d *DB) AddIntraDayTrade(ctx context.Context, intraDayTrade IntraDayTrade) error  {
	balanceClient := d.client.Collection(tradesCollection)

	key := []byte(fmt.Sprintf("%d", intraDayTrade.Day))
	hasher := sha1.New()
	hasher.Write(key)
	id, _ := primitive.ObjectIDFromHex(hex.EncodeToString(hasher.Sum(nil)[:12]))

	intraDayTrade.ID = id

	opts := options.Update().SetUpsert(true)
	_, err := balanceClient.UpdateOne(ctx, bson.D{{"_id", intraDayTrade.ID}}, bson.D{{"$set", intraDayTrade}}, opts)
	return err
}
