import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    reserves:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserve"}]
},{timestamps: true})


const User = model('User', userSchema)
export {User}