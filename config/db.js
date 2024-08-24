import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greattask:210603@cluster0.f1xxrv4.mongodb.net/PC-Laptop').then(()=> console.log("DB connected"));
 }