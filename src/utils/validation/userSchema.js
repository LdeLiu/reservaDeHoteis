import * as yup from "yup";
import { CommonError } from "../commonError.js";

class UserSchemaValidation {
    static async isValid(data){
        const userSchema = yup.object().shape({
            name: yup.string().required(),
            password: yup.string().required(),
            email: yup.string().required().email()
        })

        try {
            await userSchema.validate(data)
            return {error: false}
        } catch (error) {
            return CommonError.build(error.errors)
        }
    }

    static async loginIsValid(data){
        const loginSchema = yup.object().shape({
            password: yup.string().required(),
            email: yup.string().required().email()
        })
        try {
            await loginSchema.validate(data)
            return {error: false}
        } catch (error) {
            return CommonError.build(error.errors)
        }
    }
}

export {UserSchemaValidation}