import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// these routes are to grab information about users
router.get("/:id", verifyToken, getUser); // route to /users/id
router.get("/:id/friends", verifyToken, getUserFriends); // route to /user/id/friends

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); // route to /user/id/friendId to add or delete friends

export default router;
