import express from "express";
import userController from "../controllers/userController";
import upload from "../config/multer";
const router = express.Router();

router.get("/test", userController.test);
router.post("/signUp", upload.single("image"), userController.addUser);

export default router;
