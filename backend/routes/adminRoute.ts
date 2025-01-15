import express from "express";
import adminController from "../controllers/adminController";
import verifyAdminToken from "../middleware/admin_auth";
const router = express.Router();


//routes
router.get("/users", verifyAdminToken, adminController.getUsers);
router.post("/login", adminController.login);
router.delete("/deleteUser", adminController.deleteUser);

export default router;
