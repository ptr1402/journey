import express, { type Express } from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import mealRoutes from "./routes/mealRoutes";
import groupRoutes from "./routes/groupRoutes";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3500;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/meals", mealRoutes);
app.use("/groups", groupRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
