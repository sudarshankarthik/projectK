import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { addRemoveFriends, getUser, getUserFriends } from "../controllers/users.js";

const router = Router()

router.get("/:id",verifyToken,getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

router.patch("/friend/:friendId", verifyToken, addRemoveFriends)

export default router