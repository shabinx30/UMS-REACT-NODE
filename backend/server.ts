import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import cors from "cors";
import pool from "./config/db";


const app = express();
app.use(cors({ origin: "http://localhost:5173" }));


app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoute);
app.use("/", userRoute);


//data base connection
pool.connect()
.then(() => console.log("Database connected"))
.catch((err: any) => console.error("Connection error:", err));

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on ${process.env.PORT || 4000}`);
});
