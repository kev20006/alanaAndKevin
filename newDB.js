var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kev20006:Newp4ssword2@weddinglist-shard-00-00-d5pnu.mongodb.net:27017,weddinglist-shard-00-01-d5pnu.mongodb.net:27017,weddinglist-shard-00-02-d5pnu.mongodb.net:27017/test?ssl=true&replicaSet=WeddingList-shard-0&authSource=admin";


MongoClient.connect(url, (err, db)=> {
  if (err) throw err;
  db.createCollection("weddingList2")
})
