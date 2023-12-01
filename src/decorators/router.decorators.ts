import { Router } from "express";



const DecoratorRoutsers: Router = Router()

export function Get(path?: string | undefined) {
    return function (target: any, prpertyKey: string, descriptor: PropertyDescriptor) {
        const route = path ? (path[0] == '/' ? path : '/' + path) : '/' + prpertyKey;
        
        
        DecoratorRoutsers.get(`${route}`, descriptor.value)
    }
}
export function Post(path?: string | undefined) {
    return function (target: any, prpertyKey: string, descriptor: PropertyDescriptor) {
        const route = path ? (path[0] == '/' ? path : '/' + path) : '/' + prpertyKey;
        
        
        DecoratorRoutsers.post(`${route}`, descriptor.value)
    }
}
export function Put(path?: string | undefined) {
    return function (target: any, prpertyKey: string, descriptor: PropertyDescriptor) {
        const route = path ? (path[0] == '/' ? path : '/' + path) : '/' + prpertyKey;
        
        
        DecoratorRoutsers.put(`${route}`, descriptor.value)
    }
}
export function Patch(path?: string | undefined) {
    return function (target: any, prpertyKey: string, descriptor: PropertyDescriptor) {
        const route = path ? (path[0] == '/' ? path : '/' + path) : '/' + prpertyKey;
        
        
        DecoratorRoutsers.patch(`${route}`, descriptor.value)
    }
}
export function Delete(path?: string | undefined) {
    return function (target: any, prpertyKey: string, descriptor: PropertyDescriptor) {
        const route = path ? (path[0] == '/' ? path : '/' + path) : '/' + prpertyKey;
        
        
        DecoratorRoutsers.delete(`${route}`, descriptor.value)
    }
}

export function Controller(controllerPath?: string | undefined) {
    return function (target: any) {

        

        if (controllerPath?.[0] !== '/') controllerPath = controllerPath + '/'
        const path = controllerPath ? controllerPath : '/'
        DecoratorRoutsers.use(path, DecoratorRoutsers)



    }
}

export default DecoratorRoutsers