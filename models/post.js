import mongoose from "mongoose";

const Post = mongoose.model('post', {
    title: String,
    content: String,
    author: String,
    view_count: Number,
    created_at: Date
});

export default Post;