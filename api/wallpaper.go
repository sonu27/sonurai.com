package handler

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/allegro/bigcache"
	"github.com/mitchellh/mapstructure"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const (
	firestoreCollection = "BingWallpapers"
)

type Image struct {
	Title     string `json:"title"`
	Copyright string `json:"copyright"`
	Date      int    `json:"date"`
	Filename  string `json:"filename"`
	Market    string `json:"market"`
}

var firestoreClient *firestore.Client
var cache *bigcache.BigCache

func init() {
	cache, _ = bigcache.NewBigCache(bigcache.DefaultConfig(24 * time.Hour))

	ctx := context.Background()
	saJSON, _ := base64.StdEncoding.DecodeString(os.Getenv("FIRESTORE_SA"))
	sa := option.WithCredentialsJSON(saJSON)
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		panic(err)
	}

	firestoreClient, err = app.Firestore(ctx)
	if err != nil {
		panic(err)
	}
}

func Handler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["id"]

	if !ok || len(keys[0]) < 1 {
		w.WriteHeader(404)
		return
	}

	id := keys[0]

	entry, _ := cache.Get(id)
	if len(entry) > 0 {
		w.Write(entry)
		return
	}

	ctx := context.Background()
	dsnap, err := firestoreClient.Collection(firestoreCollection).Doc(id).Get(ctx)

	if status.Code(err) == codes.NotFound {
		w.WriteHeader(404)
		return
	}

	if dsnap.Exists() {
		data := dsnap.Data()

		var result Image
		mapstructure.Decode(data, &result)
		b, _ := json.Marshal(result)

		w.Write(b)
		cache.Set(id, b)
		return
	}

	w.WriteHeader(404)
}
