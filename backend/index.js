import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";
import { errorHandler, notFound } from "./middlewares/error.middlewares.js";
import cors from "cors";
import publicRouter from "./routes/publicroutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["https://bio-link-cyan-two.vercel.app","http://localhost:5173"],
    credentials: true,
  })
);
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ success: "Ok", message: "Server is running" });
});



app.use("/api/users", router);
app.use('/api',router)
app.use('/',publicRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
