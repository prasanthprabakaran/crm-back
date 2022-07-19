import { client } from "../index.js";
import {ObjectId} from "mongodb";

export async function getAllMovies(request) {
    return await client
        .db("crmdata")
        .collection("sample")
        .find(request.query)
        .toArray();      
}

export async function getMovieById(id) {
    return await client
    .db("crmdata")
    .collection("sample")
    .findOne({ _id: ObjectId(id) });      
}

export async function createMovies(data) {
    return await client
    .db("crmdata")
    .collection("sample")
    .insertMany(data);      
}

export async function deleteMovieById(id) {
    return await client
    .db("crmdata")
    .collection("sample")
    .deleteOne({ _id: ObjectId(id)});      
}

export async function updateMovieById(id, data) {
    return await client
    .db("crmdata")
    .collection("sample")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

export async function createUser(data){
    return await client
    .db("crmdata")
    .collection("users")
    .insertOne(data);
}

export async function getUserByName(username) {
    //db.users.findOne({username: username})
    return await client
    .db("crmdata")
    .collection("users")
    .findOne({ username: username });      
}

