import { Router } from "express"
import User from "../models/user.js";
import mongoose from "mongoose";
import upload from "../middleware/multer.js";

const router = Router();

router.get('/', async (req, res) => {

    res.send(await User.find());

})

router.get('/:id', async (req, res) => {
    //console.log(req.params.id);
    res.send(await User.findById(req.params.id))
});

router.post('/', upload.single('picture'), async (req, res) => {
    //console.log(req.file)
    req.body.photo = req.file?.filename;
    console.log(req.body.photo)
    await User.create(req.body);
    res.send("new user added")
});

router.put('/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.send("User data updated")
});

router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    res.send("User Deleted");

});

export default router;