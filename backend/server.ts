import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
dotenv.config();

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoute);
app.use("/", userRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on ${process.env.PORT || 4000}`);
});
