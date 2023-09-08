import { CommonError } from '../../../utils/commonError.js'
import { Crypt } from '../../../utils/crypt.js'
import JWT from 'jsonwebtoken'

class UserService{
    constructor(repository){
        this.repository = repository;
    }

    async create(data){
        const userAreadyExists = await this.repository.findByEmail(data.email)
        if(userAreadyExists){
            return CommonError.build('User already exists')
        } 

        const newUser = {
            ...data,
            password: Crypt.encrypt(data.password)
        }

        const result = await this.repository.create(newUser)
        return result
    }

    async singIn(data){
        const userAreadyExists = await this.repository.findByEmail(data.email)
        if(!userAreadyExists){
            return CommonError.build('invalid credentials')
        } 
        const passworIsValid = Crypt.compare(data.password, userAreadyExists.password)
        if(!passworIsValid){
            return CommonError.build('invalid credentials')
        }

        const payload = {...userAreadyExists}
        const secretKey = process.env.SECRET_KEY
        const options = {expiresIn: '15m'}

        const token = JWT.sign(payload, secretKey, options)
        return token
    }
}

export {UserService}