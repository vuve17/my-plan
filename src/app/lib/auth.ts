import { jwtVerify, SignJWT } from "jose"

interface UserJwtPayload {
    //jti - JWT ID, iat - Issued At
    jti: string,
    iat: number
}

export const getJwtSecretKey = ()  => {
    const secret = process.env.JWT_SECRET

    if(!secret || secret.length === 0){
        throw new Error('no secret found')
    }

    return secret
}

export const verifyAuth =async (token:string) => {
    try{
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload as UserJwtPayload
    } catch (error) {
        throw new Error("your token has expired")
    }
}