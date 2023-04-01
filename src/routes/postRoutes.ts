import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  patchPost,
  addComment,
  likeComment,
} from "../controllers/postControllers";

const postRouter = express.Router();

// posts routes
postRouter.route("/").get(getPosts).post(createPost);
postRouter.route("/:postId").delete(deletePost).patch(patchPost);

// comment routes
postRouter.route("/:postId/comments").post(addComment);
postRouter.route("/:postId/comments/:commentId").get(likeComment);

export default postRouter;
