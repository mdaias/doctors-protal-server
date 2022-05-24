const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://doctor_admin:hzP8vblfem3Lcm0R@cluster0.jmckj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();

        const serviceColection = client.db("doctors_portal").collection('service');
        
        app.get('/service',async (req, res)=>{
            const query = {};
            const cursor = serviceColection.find(query);
            const services = await cursor.toArray();

            res.send(services)
        })
    }
    finally{

    }
}

run().catch(console.dir);



app.listen(port,()=>{
    console.log('listening to port',port)
})