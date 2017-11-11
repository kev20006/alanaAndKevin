const express= require('express');
const app = express();
var compression = require('compression')
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kev20006:Newp4ssword2@weddinglist-shard-00-00-d5pnu.mongodb.net:27017,weddinglist-shard-00-01-d5pnu.mongodb.net:27017,weddinglist-shard-00-02-d5pnu.mongodb.net:27017/test?ssl=true&replicaSet=WeddingList-shard-0&authSource=admin";

app.use(compression())
app.use(bodyParser.json())
app.use(express.static( __dirname))




app.get('/', (req,res) => {
  res.sendFile("index.html",{root: __dirname})
});

app.post('/submit', (req, res) =>{
  var newObj = {
    name: req.body.name,
    attending: req.body.attending,
    staying: req.body.staying,
    diet: req.body.diet
  }
  console.log(req.body.name);
  console.log(req.body.attending);
  console.log(req.body.staying);
  console.log(req.body.diet);
  pushToDB(newObj)
})


app.listen((process.env.PORT || 5000), ()=> {
  console.log("express3 is listening on port 3000!")
});


function pushToDB(obj){
  MongoClient.connect(url, (err, db)=> {
    if (err) throw err;
    db.collection("weddingList2").insertOne(obj,(err, res) =>{
      if(err) throw err;
      console.log("1 thing inserted");
      db.close();
    })
  })
}
