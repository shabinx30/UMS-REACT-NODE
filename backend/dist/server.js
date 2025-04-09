"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.use("/uploads", express_1.default.static("uploads"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/admin", adminRoute_1.default);
app.use("/", userRoute_1.default);
//data base connection
db_1.default.connect()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Connection error:", err));
app.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on ${process.env.PORT || 4000}`);
});
