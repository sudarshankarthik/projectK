import { Router } from "express";
import {login, register} from "../controllers/auth.js";
import upload from "../middleware/storage.js";
import { verifyToken } from "../middleware/auth.js";
import { uploadToCloudinary } from "../middleware/cloudinary.js";
const router = Router()

router.post("/register",upload.single('picture'),uploadToCloudinary, register)
router.post('/login',login)

export default router