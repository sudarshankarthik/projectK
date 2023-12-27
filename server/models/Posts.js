import {Schema, model } from "mongoose";


const postSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: String,
    discription: {
        type: String,
        required: true
    },
    picturePath: String,
    userPicturePath: String,
    comments: {
        type: Array,
        default: []
    },
    likes: {
        type: Map,
        of: Boolean
    }
},{timestamps: true})

const Post = new model("Posts",postSchema)

export default Post