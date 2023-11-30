import express from "express";
import { getFeedPosts, getUserPosts, likePosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); // shows all the posts to every user
router.get("/:userId", verifyToken, getUserPosts); // shows posts of a specific user

/* UPDATE */
router.patch("/:id/like", verifyToken, likePosts); // liking the post

export default router;
