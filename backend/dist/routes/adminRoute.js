"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const admin_auth_1 = __importDefault(require("../middleware/admin_auth"));
const router = express_1.default.Router();
//routes
router.get("/users", admin_auth_1.default, adminController_1.default.getUsers);
router.post("/login", adminController_1.default.login);
router.get('/searchUser', admin_auth_1.default, adminController_1.default.searchUser);
router.delete("/deleteUser", admin_auth_1.default, adminController_1.default.deleteUser);
exports.default = router;
