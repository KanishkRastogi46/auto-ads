import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    fullname: {
        firstname: {type: String, required: true},
        middlename: String,
        lastname: String,
    },
    password: {type: String, required: true},
})

const user = mongoose.models.users || mongoose.model("users", userSchema);

export default user;