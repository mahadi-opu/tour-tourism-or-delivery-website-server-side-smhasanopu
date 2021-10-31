const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());




// MongoD 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uqwrr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("GreenWings");
        const serviceCollection = database.collection("services");
        const blogCollection = database.collection("blogs");
        const orderCollection = database.collection("orders");


        // GET Order API 
        app.get('/orders', async (req, res) => {
            const cursor = orderCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);

        })
        // GET Order API 
        app.post('/orders', async (req, res) => {
            const orders = req.body;
            console.log('hit', orders);
            const result = await orderCollection.insertOne(orders);
            console.log(result);
            res.json(result);
        });
        // GET services API 
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });
        // GET Order API 
        app.post('/services', async (req, res) => {
            const services = req.body;
            console.log('hit', services);
            const result = await serviceCollection.insertOne(services);
            console.log(result);
            res.json(result);
        });
        // GET Blogs API 
        app.get('/blogs', async (req, res) => {
            const cursor = blogCollection.find({});
            const blogs = await cursor.toArray();
            res.send(blogs);
        });
        // Delete API 
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.json(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Runnig my CURD Server');
});

app.listen(port, () => {
    console.log('Running Server on port', port);
})