require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


// Middleware
app.use(express.json());
app.use(cors());



const uri = process.env.DATABASE_URL

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bgw1n6h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Database is connected!!");


    const database = client.db('mobile-banking');
    const userCollection = database.collection('users');
    const transactionsCollection = database.collection('transactions');


    // authentication apis 
    app.post('/register', async (req, res) => {
        try{
            const data = req.body;
            console.log(data);
        }
        catch (error){
            return res.json({
                success: false,
                error: error.message
            })
        }
    })


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Mobile Banking server is running!!!');
})

app.listen(port, () => {
    console.log('Mobile banking server is listening on port ' + port);
})
