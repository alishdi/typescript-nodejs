import { NextFunction, Request, Response } from "express"
import { HttpError } from "../types/public.types";


export function NotfoundErrorHandler(req: Request, res: Response, next: NextFunction) {
    const errorCode: number = 404;
    const message: string = "صفحه و یا آدرس مورد نظر شما یافت نشد";
    res.status(errorCode).json({
        status: errorCode,
        message,
    });
}


export function ApiErrorHandler(error: HttpError, req: Request, res: Response, next: NextFunction) {
    const errorCode: number = error?.status || 500;
    const message: string = error?.message || "InternalServerError";
    res.status(errorCode).json({
        ...error,
        status: errorCode,
        message,
    });
}
