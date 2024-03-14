import { Router } from "express"
import Post from "../models/post.js";
import mongoose from "mongoose";
import upload from "../middleware/multer.js";
import { unlink } from 'node:fs/promises'
import multer from "multer";

const router = Router();



// router.get('/', (req, res) => {
//     res.send("HELL")
// });
// get total post count
router.get('/total', async (req, res) => {
    // const obj = await Post.countDocuments();
    res.send({ count: await Post.countDocuments() })
});

// get post by id, update view count
router.get('/:id', async (req, res, next) => {
    const { view_count } = await Post.findById(req.params.id);
    await Post.findByIdAndUpdate(req.params.id, { view_count: view_count + 1 })
    res.send(await Post.findById(req.params.id))
});

//get all posts
router.get('/', async (req, res) => {
    res.send(await Post.find())
});

//Create new post

router.post('/', upload.single('picture'), async (req, res) => {
    req.body.created_at = new Date();
    req.body.picture = req.file?.filename
    const data = await Post.create(req.body);
    // console.log(data);
    res.send(data);
});

const uploadFn = upload.single('picture');
// Edit old post
// router.put('/:id', upload.single('picture')(req,res,(err)=>{
router.put('/:id', (req, res) => {
    uploadFn(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log("multer error");
            console.log(err);
        } else if (err) {
            console.log("unknown error");
            console.log(err);
        }
        // console.log(req.file);
        if (req.file) {
            const { picture } = await Post.findById(req.params.id);
            if (picture) {
                await unlink('./uploads/' + picture);
                await Post.findByIdAndUpdate(req.params.id, { picture: req.file.filename });
            } else {
                await Post.findByIdAndUpdate(req.params.id, { picture: req.file.filename });
            }
        }
        await Post.findByIdAndUpdate(req.params.id, req.body);
        res.send(await Post.findById(req.params.id));
    });
});

router.delete('/:id', async (req, res) => {
    const {picture} = await Post.findById(req.params.id)
    // console.log(picture);
    await unlink('./uploads/' + picture);
    await Post.findByIdAndDelete(req.params.id);
    res.send("Post Deleted")
});

export default router;


