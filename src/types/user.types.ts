export interface IUser extends Document{
    fullname: string;
    username: string;
    password:string;
    email:string;
    mobile:string;
    avatar?:string;
    token?:string;
}