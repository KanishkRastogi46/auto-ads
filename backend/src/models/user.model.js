import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    user_id: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    picture: String,
})

const user = mongoose.models.users || mongoose.model("users", userSchema);

export default user;