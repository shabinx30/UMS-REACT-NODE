import { Request, Response } from "express";
import * as userModel from '../models/userModel'

const addUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { name, profile, email, password } = req.body
        if(!name || !email || !password){
            res.status(400).json({ error: "Name, email, password is requied!" });
            return 
        }
        const user = await userModel.addUser(name, profile || '', email, password)
        res.status(201).json({ user })
    } catch (error) {
        res.status(500).json({ error: "Error while adding the user!" });
    }
}

const test = async (req: Request, res: Response) : Promise<void> => {
    try {
        // console.log('request came!!!');
        
        res.json({ result: 'api is working' })
    } catch (error) {
        res.status(500).json({ error: "Error while adding the user!" });
    }
}

export default {
    addUser,
    test
}