import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import http, { Server } from 'http';
import { HttpError, ResponseMethod } from './types/public.types';
import ApplicationRouter from './routes/index.routes';
import cors from 'cors'
import morgan from 'morgan';
import './app.module'
import './config/DB'
import { ApiErrorHandler, NotfoundErrorHandler } from './errHandler/errHandler';
const app: Application = express();
const server: Server = http.createServer(app);
const PORT: number = 5600
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(ApplicationRouter)
app.use(NotfoundErrorHandler)
app.use(ApiErrorHandler)
server.listen(PORT, () => {
    console.log(`server listen to port http://localhost:${PORT}`)
})

