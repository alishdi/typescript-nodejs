import { NextFunction, Request, Response } from "express";
import { Controller } from "../decorators/router.decorators";
import {Get} from '../decorators/router.decorators'


@Controller('/home')
class HomeApplication {
    @Get()
    GetHomeInfo(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({ hello: 'hello nodejs' })

        } catch (error) {
            next(error)

        }
    }
}
export const home=new HomeApplication()

