import { Request, Response } from "express";
import * as userModel from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const addUser = async (req: Request, res: Response) : Promise<void> => {
    try {

        const { name, email, password } = req.body

        const profile = req.file?.path
        if(!name || !email || !password){
            res.status(400).json({ error: "Name, email, password is requied!", message: 'data are missing!' });
            return 
        }

        const exist = await userModel.userExist(email)
        if(exist && exist.rowCount) {
            res.json({ message: 'This user is already existing!' })
            return 
        }

        const user = await userModel.addUser(name, profile || '', email, password)

        //jwt 
        if(!process.env.ACCESS_TOKEN_SECRET){
            throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
        }


        const token = jwt.sign({userId: user.id, role: 'user'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

        res.status(201).json({ user, token, message: 'success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error while adding the user!", message: 'Internal sever error!' });
    }
}

//loing*****************
const login = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { email, password } = req.body
        const data = await userModel.login(email, password)

        if(data.rowCount) {
            const user = data.rows[0]
            if(await bcrypt.compare(password, user.password)){

                //jwt 
                if(!process.env.ACCESS_TOKEN_SECRET){
                    throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
                }

                const token = jwt.sign({userId: user.id, role: 'user'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
                res.json({ token, user, message: 'success' })
            }else{
                res.json({ message: 'email or password is incorrect!!!' })
            }
        }else{
            res.json({ message: 'User is not existing!!!' })
        }
    } catch (error) {
        console.log(error)
    }
}

const test = async (req: Request, res: Response) : Promise<void> => {
    try {
        
        res.json({ result: 'api is working' })
    } catch (error) {
        res.status(500).json({ error: "Error while adding the user!" });
    }
}

const editUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { name, email } = req.body
    } catch (error) {
        console.log(error);
    }
}


export default {
    addUser,
    login,
    test,
    editUser
}