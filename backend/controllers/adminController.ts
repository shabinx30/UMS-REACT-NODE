import { Request, Response } from "express";
import * as userModel from '../models/userModel'
import jwt from 'jsonwebtoken'


const getUsers = async (req: Request, res: Response) : Promise<void> => {
    try {
        const users = await userModel.getUsers()
        // console.log(users)
        res.json({ users, message: 'success' })
        return;
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
            // console.log('success')
            res.json({ token, user: req.body, message: 'success' })
        }else{
            // console.log('fail')
            res.json({ message: 'Email or password is incorrect!!!' })
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const id:any = req.query.id
        await userModel.deleteUser(id)
        res.json({ status: true, message: 'success' })
    } catch (error) {
        console.log(error)
    }
}

const searchUser = async (req: Request, res: Response) : Promise<any> => {
    try {
        const name: any = req.query.name
        const result = await userModel.searchUser(name)
        return res.json({ result : result.rows })
    } catch (error) {
        console.log(error)
    }
}


export default {
    getUsers,
    login,
    deleteUser,
    searchUser
}