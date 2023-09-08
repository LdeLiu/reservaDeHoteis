import mongoose, {Schema, model} from "mongoose";

const reserveSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    },
    checkIn:{
        type: Date,
        require: true
    },
    checkOut:{
        type: Date,
        require: true
    },
    status:{
        type: String,
        require: true
    }
},{timestamps: true})

const Reserve = model('Reserve',reserveSchema)
export{Reserve}