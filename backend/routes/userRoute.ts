import express from "express";
import userController from "../controllers/userController";
import verifyUserToken from "../middleware/user_auth";
import upload from "../config/multer";
const router = express.Router();

router.get("/test", userController.test);
router.post("/signUp", upload.single("profile"), userController.addUser);
router.post("/login", userController.login)
router.post("/editUser", verifyUserToken, upload.single("profile"), userController.editUser)

export default router;
