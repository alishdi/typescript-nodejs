import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { sign, Algorithm } from "jsonwebtoken";
import UserModel from "../model/user.model";
import createHttpError from "http-errors";
import { jwtGeneratorPayloadDTO } from "../types/public.types";
const AccessTokenSecretKey = '56C0F60FA16CFFB9CDEDB70044D94D99A95B0C1'
function hashPassword(password: string): string {
    const salt: string = genSaltSync(10);
    const hashstr: string = hashSync(password, salt)
    return hashstr
}
export function ComparePasswordSync(password: string, hashPassword: string): boolean {
    return compareSync(password, hashPassword)
}
export async function jwtGen(payload: jwtGeneratorPayloadDTO): Promise<void> {
    const { id, username } = payload
    const user = await UserModel.findById(id)
    if (!user) throw createHttpError.NotFound('notfound user')
    const expiresIn = new Date().getTime() + (1000 * 60 * 60 * 24);
    const algorithm: Algorithm = "HS512"
    let signerror: any
    sign(payload, AccessTokenSecretKey, { expiresIn, algorithm }, async (error, token) => {
        if (!error && token) {
            user.token = token
            await user.save()
        } else {
            signerror = error
        }
    })

}
export function errorHandler(errors:any) {
    let errText:string[] = []
    for (const errItem of errors) {
        errText=errText.concat(errItem.constraints)
        
    }
    return errText
}

export default hashPassword