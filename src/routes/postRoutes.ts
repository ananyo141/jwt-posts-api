import express from "express";
import {
	getPosts,
	createPost,
	deletePost,
	putPost,
} from "../controllers/postControllers";

const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(createPost);
postRouter.route("/:postId").delete(deletePost).put(putPost);

export default postRouter;
