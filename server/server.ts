import express  from "express";
import dotenv from "dotenv"
import { log } from "console";

const app = express()
dotenv.config()

app.listen(process.env.PORT || 4000,() => {
    log(`server is running on ${process.env.PORT || 4000}`);
})