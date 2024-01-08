import { jwtVerify, SignJWT } from "jose"
import { JWTPayload } from "jose"

interface UserJwtPayload extends JWTPayload {
    //jti - JWT ID, iat - Issued At, sub - subject (id)
    jti: string,
    iat: number,
    userId: string
}

export const getJwtSecretKey = ()  => {
    const secret = process.env.JWT_SECRET

    if(!secret || secret.length === 0){
        throw new Error('no secret found')
    }
    return secret
}

export const getUserId = async (token:string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload.userId as string;
    } catch (error) {
        return;
    }
}