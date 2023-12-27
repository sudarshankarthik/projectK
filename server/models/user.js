import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true
        },
        picturePath: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        occupation: {
            type: String,
            default: ""
        },
        friends: {
            type: Array,
            default: []
        },
        viewedProfile: Number,
        impressions:Number
    }, 
    {timestamps: true}
    )

const User = model("User",UserSchema)

export default User