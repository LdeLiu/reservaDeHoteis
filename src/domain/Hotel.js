import mongoose,{Schema, model} from "mongoose";

const hotelSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    avaliableRooms:{
        type: Number,
        default: 0
    }
},{timestamps: true})

const Hotel = model('Hotel',hotelSchema)
export{Hotel}