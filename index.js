import express from "express";
import mongoose from "mongoose";
import user from "./controler/user.js";
import post from "./controler/post.js";

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use('/users/', user);
app.use('/posts/', post);
app.use('/uploads/', express.static('./uploads'))

await mongoose.connect('mongodb://localhost:27017/pirma_duombaze');

app.listen(3000);