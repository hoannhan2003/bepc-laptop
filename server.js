import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";

// app config 
const app = express();
const port = 4000;

// db connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// static files
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, 'uploads')));



// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

// start the server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});