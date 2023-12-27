import Post from "../models/Posts.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
    try {
        const userId = req.user.id
        const {description} = req.body
        const picturePath = req.picturePath
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            discription: description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save()

        const post = await Post.find()

        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


export const getFeedPosts = async (req,res) => {
    try {
        const post = await Post.find()
        
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
}

export const getUserPosts = async (req,res) => {
    try {
        const {userId} = req.params
        const post = await Post.find({userId})
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
}

export const likePost = async (req,res) => {
    try {
        const {id} = req.params
        const userId = req.user.id
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        console.log(userId);

        console.log(isLiked)

        if (isLiked) 
            post.likes.delete(userId)
        else 
            post.likes.set(userId,true)

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        ) 
        
        res.status(200).json(updatedPost)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error})
    }
}