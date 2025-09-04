import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./router/auth.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
