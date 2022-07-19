import express from "express";
import { 
    getAllMovies,
    createMovies,
    deleteMovieById,
    updateMovieById,
    getMovieById} from "./helper.js";
const router = express.Router();
//find all
router.get("/", async function (request, response) {

    const list = await getAllMovies(request);
    response.send(list);
});

//find one
router.get("/:id", async function (request,response) {
    const {id} = request.params;
    console.log(request.params,id);

    const list = await getMovieById(id);
    list 
        ? response.send(list) 
        : response.status(404).send({ msg: "Movie not found" });
});

//insert
router.post("/",async function (request, response) {
    const data = request.body;
    console.log(data);
    // db.list.insertMany(data)

    const result = createMovies(data);
    response.send(result);
});

//delete
router.delete("/:id", async function (request,response) {
    const {id} = request.params;
    console.log(request.params,id);

    const result = deleteMovieById(id);
    result.deletedCount > 0
        ? response.send({ msg: "List deleted successfully" }) 
        : response.status(404).send({ msg: "Movie not found" });
});

//update
router.put("/:id", async function (request,response) {
    const {id} = request.params;
    console.log(request.params,id);
    const data = request.body;

    const result = await updateMovieById(id, data);

    response.send(result);
});

export const listRouter = router;
