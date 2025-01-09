import express from "express";
import userController from "../controllers/userController";
import upload from "../config/multer";
const router = express.Router();

router.get("/test", userController.test);
router.post("/signUp", upload.single("profile"), userController.addUser);

export default router;
