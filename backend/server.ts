import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import { log } from "console";

const app = express();
dotenv.config();

app.use("/uploads", express.static("uploads"));
app.use("/admin", adminRoute);
app.use("/", userRoute);

app.listen(process.env.PORT || 4000, () => {
  log(`server is running on ${process.env.PORT || 4000}`);
});
