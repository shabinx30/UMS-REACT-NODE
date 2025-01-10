import { Request, Response } from "express";
import * as userModel from '../models/userModel'
import jwt from 'jsonwebtoken'


const getUsers = async (req: Request, res: Response) : Promise<void> => {
    try {
        const users = await userModel.getUsers()
        // console.log(users)
        res.json({ users })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        if(email == process.env.EMAIL && password == process.env.PASSWORD) {
            if(!process.env.ACCESS_TOKEN_SECRET){
                throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
            }
            
            const token = jwt.sign({userId: -23, role: 'admin'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

            // const user = { email, password }
            console.log('success')
            res.json({ token, user: req.body, message: 'success' })
        }else{
            console.log('fail')
            res.json({ message: 'email or password is incorrect!!!' })
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const id:any = req.query.id
        await userModel.deleteUser(id)
        res.json({ status: true })
    } catch (error) {
        console.log(error)
    }
}


export default {
    getUsers,
    login,
    deleteUser
}