import {sign} from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'



class ID{
    id:string;
    constructor(){
        this.id=uuid()
    }
}

interface JWTResponse{
    token:string,
    userId:string
}
const userId = new ID()

export const JWT = {
   SIGN(id?:string):JWTResponse{
        const token = sign({} , 'ghghhdyryhfgwsyjtyweath' , {
            subject:!id  ? userId.id : id,
            expiresIn:'1d'
        })
        const UserAutenticate = {
            token:token,
            userId:userId.id
        }
        return UserAutenticate
    }
}