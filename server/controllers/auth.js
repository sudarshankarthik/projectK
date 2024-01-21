import { compare, genSalt, hash } from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const register = async (req,res) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation,
            bio
        } = req.body
        console.log(email);
        const salt = await genSalt()
        const hashedPassword = await hash(password,salt)

        const picturePath = req.picturePath

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            bio,
            viewedProfile: 0,
            impressions: 0
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        console.log(error);
    }
}

export const login = async (req,res) => {
    try {
        const {
            email,
            password,
        } = req.body
        console.log(email);
        const user = await User.findOne({email: email})
        if (!user)
            return res.status(400).json({error: "user not found"})
        const isMatch = await compare(password,user.password)
        if (!isMatch)
            return res.status(403).json({error: "password did not match"})
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
        user.password = undefined
        res.status(200).json({user,token})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}