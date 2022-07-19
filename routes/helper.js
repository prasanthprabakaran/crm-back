import { client } from "../index.js";
// import {ObjectId} from "mongodb";

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
    .findOne({ id: id });      
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
    .deleteOne({ id: id});      
}

export async function updateMovieById(id, data) {
    return await client
    .db("crmdata")
    .collection("sample")
    .updateOne({ id: id }, { $set: data });
}



