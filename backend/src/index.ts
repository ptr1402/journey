import express, { type Express } from "express";
import dotenv from "dotenv";

import {
  authRouter,
  groupRouter,
  invitationRouter,
  joinRequestRouter,
  likeRouter,
  mealProductRouter,
  mealRouter,
  postRouter,
  productRouter,
} from "./api/routes/index";
import { goalRouter, profileRouter, userRouter } from "./api/routes/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3500;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/goals", goalRouter);
app.use("/groups", groupRouter);
app.use("/invitations", invitationRouter);
app.use("/joinRequests", joinRequestRouter);
app.use("/likes", likeRouter);
app.use("/mealProducts", mealProductRouter);
app.use("/meals", mealRouter);
app.use("/posts", postRouter);
app.use("/products", productRouter);
app.use("/profiles", profileRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
