import express from "express";
import adminController from "../controllers/adminController";
import verifyAdminToken from "../middleware/admin_auth";
const router = express.Router();


//routes
router.get("/users", verifyAdminToken, adminController.getUsers);
router.post("/login", adminController.login);
router.get('/searchUser', verifyAdminToken, adminController.searchUser);
router.delete("/deleteUser", verifyAdminToken, adminController.deleteUser);

export default router;
