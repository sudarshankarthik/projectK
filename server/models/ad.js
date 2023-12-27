import { Schema, model } from "mongoose";

const AdSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    picturePath: {
        type: String,
        default: ""
    }
})

const Ad = model("ads",AdSchema)

export default Ad