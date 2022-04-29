import { sign } from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'



class ID {
  id: string;
  constructor() {
    this.id = uuid()
  }
}

interface JWTResponse {
  token: string,
  userId: string
}
// const userId = new ID()

export const JWT = {
  SIGN(): JWTResponse {

    const userId = new ID();

    const token = sign({}, 'ghghhdyryhfgwsyjtyweath', {
      subject: userId.id,
      expiresIn: '1d'
    })
    const UserAutenticate = {
      token: token,
      userId: userId.id
    }
    return UserAutenticate
  },
  newToken(id: string): string {

    const token = sign({}, 'ghghhdyryhfgwsyjtyweath', {
      subject: id,
      expiresIn: '1d'
    })

    return token
  }
}
