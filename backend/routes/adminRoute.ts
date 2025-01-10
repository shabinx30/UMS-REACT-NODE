import express from "express"
import adminController from "../controllers/adminController"
const router =  express.Router()


router.get('/users',adminController.getUsers);
router.post('/login',adminController.login);
router.delete('/deleteUser', adminController.deleteUser)

export default router