import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import { listRouter } from './routes/list.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());


const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected 👍😊");
    return client;
}
export const client = await createConnection();

//home
app.get('/', function (request, response) {
    response.send("Hello");
});

app.use("/list", listRouter);

app.listen(PORT,()=> console.log(`App started in ${PORT}`));