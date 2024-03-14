import { Router } from "express"
import Post from "../models/post.js";
import mongoose from "mongoose";

const router = Router();



// router.get('/', (req, res) => {
//     res.send("HELL")
// });

router.get('/total', async (req, res) => {
    // const obj = await Post.countDocuments();
    res.send({ count: await Post.countDocuments() })
});


router.get('/:id', async (req, res, next) => {
    const { view_count } = await Post.findById(req.params.id);
    await Post.findByIdAndUpdate(req.params.id, { view_count: view_count + 1 })
    res.send(await Post.findById(req.params.id))
});


router.get('/', async (req, res) => {
    res.send(await Post.find())
});

router.post('/', async (req, res) => {
    // console.log(req.body);
    // await Post.create({ ...req.body, created_at: Date.now() });
    req.body.created_at = new Date();
    const data = await Post.create(req.body);

    res.send(data);
});



router.put('/:id', async (req, res) => {
    console.log(req.body);
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.send(await Post.findById(req.params.id));
});

router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.send("Post Deleted")
});





export default router;


