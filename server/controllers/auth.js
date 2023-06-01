import { genSalt, hash } from 'bcrypt';
import User from '../models/user.js';

export const register = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const salt = await genSalt()
        const hashedPassword = await hash(password,salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
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