import { Request, Response } from "express";
import * as userModel from '../models/userModel'
import jwt from "jsonwebtoken"

const addUser = async (req: Request, res: Response) : Promise<void> => {
    try {

        const { name, email, password } = req.body

        const profile = req.file?.path
        if(!name || !email || !password){

            res.status(400).json({ error: "Name, email, password is requied!" });
            return 
        }

        const user = await userModel.addUser(name, profile || '', email, password)

        //jwt 
        if(!process.env.ACCESS_TOKEN_SECRET){
            throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
        }

        // const secret = process.env.ACCESS_TOKEN_SECRET

        const token = jwt.sign({userId: user.id, role: 'user'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

        res.status(201).json({ user, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error while adding the user!" });
    }
}

const test = async (req: Request, res: Response) : Promise<void> => {
    try {
        
        res.json({ result: 'api is working' })
    } catch (error) {
        res.status(500).json({ error: "Error while adding the user!" });
    }
}


export default {
    addUser,
    test
}