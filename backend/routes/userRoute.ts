import express from 'express'
import userController from '../controllers/userController'
const router = express.Router()


router.get('/test',userController.test)
router.post('/addUser',userController.addUser)


export default router