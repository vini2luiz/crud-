import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../schema/user.schema';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded: any = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
};