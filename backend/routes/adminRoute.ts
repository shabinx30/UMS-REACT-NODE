import express from "express"
import adminController from "../controllers/adminController"
const router =  express.Router()


router.get('/users',adminController.getUsers);
router.post('/login',adminController.login);

export default router