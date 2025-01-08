import { Request, Response } from "express";
import * as userModel from '../models/userModel'


const getUsers = async (req: Request, res: Response) : Promise<void> => {
    try {
        const users = await userModel.getUsers()
        // console.log(users)
        res.json({ users })
    } catch (error) {
        console.log(error)
    }
}

export default {
    getUsers
}