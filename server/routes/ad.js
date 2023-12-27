import { Router } from "express";
import { getAd } from "../controllers/ad.js";

const router = Router()

router.get('/',getAd)

export default router