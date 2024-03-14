import mongoose from "mongoose";

const User = mongoose.model('user', {
    name: String,
    last_name: String,
    email: String,
    password: String,
    photo: String
});

export default User;