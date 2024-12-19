const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 9000;
const app = express();

app.use(cors());
app.use(express.json());
const userName = process.env.DB_USER;
const userPassword = process.env.DB_PASS;

const uri = `mongodb+srv://${userName}:${userPassword}@cluster0.aiyi0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const marketPlace_DB = client.db("online_market_place_DB");
    const jobCollections = marketPlace_DB.collection("jobs");

    // save a jobData in server
    app.post("/jobs-add", async (req, res) => {
      const job_data = req.body;
      const result = await jobCollections.insertOne(job_data);
      res.send(result);
    });

    // get jobData from server
    app.get("/jobs", async (req, res) => {
      const result = await jobCollections.find().toArray();
      res.send(result);
    });

    // get specifice userPost job from all post jobs
    app.get("/jobs/:email", async (req, res) => {
      // NOTE:---
      // For specifice key get alawys use params
      // For conditional key we use query
      const email = req.params.email;
      const query = { "buyer.email": email };
      const result = await jobCollections.find(query).toArray();
      res.send(result);
      console.log(query);
    });

    // delete by using specifice id in server
    app.delete("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobCollections.deleteOne(filter);
      res.send(result);
    });

    // get specifice id form sever
    app.get("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobCollections.findOne(filter);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello from SoloSphere Server....");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
