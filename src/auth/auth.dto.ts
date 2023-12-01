// export interface RegisterDTO{
//     username:string;
//     fullname:string;
//     password:string;
//     email:string;
// }

import { Expose } from "class-transformer";
import { IsDefined,Matches,IsEmail} from "class-validator";


export class RegisterDTO{
    @IsDefined()
    @Expose()
    @Matches(RegExp(/^[A-za-z0-9\_\.]{5,20}$/))
    username:string;
    @IsDefined()
    @Expose()
    password:string;
    @IsDefined()
    @Expose()
    @Matches(RegExp(/[\w\s]{5,20}/))
    fullname:string;
    @IsDefined()
    @Expose()
    @Matches(RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    @IsEmail()
    email:string
}