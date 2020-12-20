const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World !");
});

const uri =
  "mongodb+srv://admin:admin@cluster0.ssyix.mongodb.net/heroDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const movieCollection = client.db("heroDb").collection("movieList");
  const movieWithTimeCollection = client
    .db("heroDb")
    .collection("movieWithTime");

  // all movie route

  app.get("/allMovie", (req, res) => {
    movieCollection.find({}).toArray((err, result) => {
      res.send(result);
    });
  });

  //   all movie with time
  app.post("/movieWithTime", (req, res) => {
    //---------------- get a users Ordered Items by email

    movieWithTimeCollection
      .find({ name: req.body.name })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  console.log("ok connect");
});

app.listen(process.env.PORT || port);
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
