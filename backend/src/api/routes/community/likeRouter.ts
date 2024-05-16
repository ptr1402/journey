import express from "express";
import {
  createLike,
  deleteLike,
  getLikeById,
  getLikes,
} from "../../controller";

export const likeRouter = express.Router();

likeRouter.route("/").get(getLikes).post(createLike);

likeRouter.route("/:likeId").get(getLikeById).delete(deleteLike);
