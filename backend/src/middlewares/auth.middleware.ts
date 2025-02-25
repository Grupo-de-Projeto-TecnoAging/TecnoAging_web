import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new UnauthorizedException('Token not provided');
        }
        
        const token = authHeader.split(' ')[1]; //padrao "bearer token_aqui"


        try {
            if (!process.env.JWT_SECRET) {
                throw new UnauthorizedException('JWT secret not defined');
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            (req as any).user = decoded;
            next();
        } catch (error) {
            throw new UnauthorizedException('Token inválido ou expirado');
        }

    }
}