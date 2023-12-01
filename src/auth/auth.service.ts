import createHttpError from "http-errors";
import UserModel from "../model/user.model";
import { RegisterDTO } from "./auth.dto";
import hashPassword from "../utils/func";
import { IUser } from "../types/user.types";

export class AuthService {
    async register(userDTO: RegisterDTO):Promise<IUser> {
        const { username, password, fullname, email } = userDTO
        const checkExist = await UserModel.findOne({ username: userDTO.username })
        if (checkExist) throw createHttpError.BadRequest('این نام قبلا در دیتا بیس ثبت شده است')
        const users:IUser = await UserModel.create({
            username, password: hashPassword(password), fullname, email
        })
        return users
    }
}