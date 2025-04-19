import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";
import { errorHandler, notFound } from "./middlewares/error.middlewares.js";
import cors from "cors";
import publicRouter from "./routes/publicroutes.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.use(
  cors({
    origin: ["http://localhost:5173","https://biolink-v7u6.onrender.com"],
    credentials: true,
  })
);
const port = process.env.PORT;

app.use("/api/users", router);
app.use("/api", router);
app.use("/u", publicRouter);

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
