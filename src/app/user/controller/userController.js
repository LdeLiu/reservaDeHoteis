import { UserSchemaValidation } from '../../../utils/validation/userSchema.js'

class UserController{
    constructor(service){
        this.service = service;
    }

    async create(req,res){
        const { body } = req
        const bodyIsValid = await UserSchemaValidation.isValid(body) 
        if(bodyIsValid.error == true){
            return res.status(400).json(bodyIsValid)
        }

        const result = await this.service.create(body)
        return res.status(result.error ? 400 : 200).json(result)
    }

    async singIn(req,res){
        const { body } = req
        const loginIsValid = await UserSchemaValidation.loginIsValid(body)
        if(loginIsValid.error == true){
            return res.status(400).json(loginIsValid)
        }

        const result = await this.service.singIn(body)
        return res.status(result.error ? 400 : 200). json(result)
    }
}

export {UserController}