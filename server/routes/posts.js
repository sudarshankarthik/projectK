import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import upload from "../middleware/storage.js";
import { uploadToCloudinary } from "../middleware/cloudinary.js";


const router = Router()

router.post("/",upload.single('picture'),verifyToken,uploadToCloudinary,createPost)

router.get("/",verifyToken,getFeedPosts)
router.get("/:userId",verifyToken,getUserPosts)

router.patch("/:id/like",verifyToken,likePost)
 

export default router