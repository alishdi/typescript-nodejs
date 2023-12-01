import { NextFunction, Request, Response } from "express";
import { Controller, Post, Get } from "../decorators/router.decorators";
import UserModel from "../model/user.model";
import { ComparePasswordSync, errorHandler, jwtGen } from "../utils/func";
import createHttpError from "http-errors";
import { IUser } from "../types/user.types";
import { ObjectId } from "mongoose";
import { AuthService } from "./auth.service";
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { RegisterDTO } from "./auth.dto";

const auhservice: AuthService = new AuthService()

@Controller('/auth')
class AuthController {
    @Post()
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const registerDTO: RegisterDTO = plainToClass(RegisterDTO, req.body, { excludeExtraneousValues: true });
            const errors = validateSync(registerDTO)
            const checkError = errorHandler(errors)
            if (checkError.length > 0) throw {status:400,errors:checkError}
            
            const user: IUser = await auhservice.register(registerDTO)

            return res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'افزودن محصول با موفقیت ایجاد شد'
                }
            })

        } catch (error) {
            next(error)

        }
    }
    @Post()
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const checkExist: IUser & { _id: ObjectId } | null = await UserModel.findOne({ username })
            if (!checkExist) throw createHttpError.BadRequest('username or password incorected')
            const isTrueUser: boolean = ComparePasswordSync(password, checkExist.password)
            if (!isTrueUser) throw createHttpError.BadRequest('username or password incorected')
            await jwtGen({ username, id: checkExist._id })
            const user = await UserModel.findById(checkExist._id, { __v: 0, password: 0 })
            return res.status(200).json({
                statusCode: 200,
                data: {
                    user
                }
            })

        } catch (error) {
            next(error)
        }

    }
}
export const auth = new AuthController()

