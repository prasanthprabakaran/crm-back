import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
const app = express();

dotenv.config();


const PORT = 4000;

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected 👍😊");
    return client;
}
const client = await createConnection();

app.get('/', function (request, response) {
    response.send("Hello");
});

app.get("/list", async function (request, response) {

    const list = await client
        .db("crmdata")
        .collection("sample")
        .find({})
        .toArray();
    // console.log(list);
    response.send(list);
});

app.get("/list/:id", async function (request,response) {
    const {id} = request.params;
    console.log(request.params,id);

    const list = await client
        .db("crmdata")
        .collection("sample")
        .findOne({id: id});
    // console.log(list);
    list 
        ? response.send(list) 
        : response.status(404).send({ msg: "Movie not found" });
});

app.post("/list",async function (request, response) {
    const data = request.body;
    console.log(data);
    // db.list.insertMany(data)

    const result = await client
        .db("crmdata")
        .collection("sample")
        .insertMany(data);
    response.send(result);
});

app.delete("/list/:id", async function (request,response) {
    const {id} = request.params;
    console.log(request.params,id);

    const result = await client
        .db("crmdata")
        .collection("sample")
        .deleteOne({id: id});
    // console.log(list);
    result.deletedCount > 0
        ? response.send({ msg: "List deleted successfully" }) 
        : response.status(404).send({ msg: "Movie not found" });
});

app.listen(PORT,()=> console.log(`App started in ${PORT}`));