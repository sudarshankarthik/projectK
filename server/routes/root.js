import { Router } from "express";
import { getRoot } from "../controllers/root.js";


const router = Router()

router.get('/',getRoot)

export default router