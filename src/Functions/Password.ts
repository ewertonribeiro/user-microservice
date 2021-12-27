import { compare, hash } from 'bcrypt';

export const Password = {
    async Compare(password:number | string , hash:any):Promise<boolean>{

        const pass = password.toString()
        const encryped = hash as string

        const ComprePassword = await compare(pass , encryped)
    
    

        return  ComprePassword

    },

    async encrypt(password:number | string):Promise<string>{

        const pass = password.toString()

        const passHash = await hash(pass , 8)


        return passHash

    }
}