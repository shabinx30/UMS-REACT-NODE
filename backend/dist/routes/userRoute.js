"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const user_auth_1 = __importDefault(require("../middleware/user_auth"));
const multer_1 = __importDefault(require("../config/multer"));
const router = express_1.default.Router();
router.get("/test", userController_1.default.test);
router.post("/signUp", multer_1.default.single("profile"), userController_1.default.addUser);
router.post("/login", userController_1.default.login);
router.post("/editUser", user_auth_1.default, multer_1.default.single("profile"), userController_1.default.editUser);
exports.default = router;
