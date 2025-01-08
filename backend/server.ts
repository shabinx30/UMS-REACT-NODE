import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import cors from "cors";
import pool from "./db";


// const { Pool } = require("pg");

// const db = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: String(process.env.DB_PASSWORD),
//   port: Number(process.env.DB_PORT) || 5432,
// });

// const connect = async () => {
  pool.connect()
    .then(() => console.log("Database connected"))
    .catch((err: any) => console.error("Connection error:", err));
// };



const app = express();
app.use(cors({ origin: "http://localhost:5173" }));


app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoute);
app.use("/", userRoute);

//data base connection
// db.connect()

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on ${process.env.PORT || 4000}`);
});
