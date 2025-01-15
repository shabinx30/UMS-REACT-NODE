import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

const verifyAdminToken = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const token : any = req.headers.Authorization

        if(!token) {
            return res.status(401).json({ message: 'Authorization is not found!!' })
        }

        // grabing the access token
        if(!process.env.ACCESS_TOKEN_SECRET){
            throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decode) {
            return res.status(401).json({ message: 'Unauthorizide access denied!!' })
        }

        next()
    } catch (error) {
        return res.status(401).json({ message: 'Internal server error!!' })
    }
}

export default verifyAdminToken