import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/storage.js";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

const router = Router()

router.post("/",verifyToken,upload.single("picture"),createPost)

router.get("/",verifyToken,getFeedPosts)
router.get("/:userId",verifyToken,getUserPosts)

router.patch("/:id/like",verifyToken,likePost)


export default router