import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

const verifyUserToken = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const token : any = req.headers.authorization

        if(!token) {
            console.log("Authorization is not found!!")
            res.status(401).json({ message: 'Authorization is not found!!' })
            return;
        }

        // grabing the access token
        if(!process.env.ACCESS_TOKEN_SECRET){
            throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decode) {
            console.log('Unauthorizide access denied!!')
            res.status(401).json({ message: 'Unauthorizide access denied!!' })
            return;
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Internal server error!!' })
        return;
    }
}

export default verifyUserToken