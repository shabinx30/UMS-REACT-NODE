import { Request, Response } from "express";
import * as userModel from '../models/userModel'

const addUser = async (req: Request, res: Response) : Promise<void> => {
    try {

        // console.log('coming to add user')

        const { name, email, password } = req.body
        const profile = req.file?.path
        if(!name || !email || !password){
            // console.log('Name, email, password is requied!')
            res.status(400).json({ error: "Name, email, password is requied!" });
            return 
        }
        console.log('goint to add user')
        const user = await userModel.addUser(name, profile || '', email, password)

        console.log('after add user')
        console.log(user)

        res.status(201).json({ user })
    } catch (error) {
        console.log(error)
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