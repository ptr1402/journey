import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../../controller";
export const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(createPost);

postRouter
  .route("/:postId")
  .get(getPostById)
  .patch(updatePost)
  .delete(deletePost);
