import * as yup from "yup";
import { CommonError } from "../commonError.js";

class reserveSchemaValidation {
    static async isValid(data){
        const reserveSchema = yup.object().shape({
            hotel: yup.string().required(),
            user: yup.string().required(),
            checkIn: yup.string().required(),
            checkOut: yup.string().required(),
            status: yup.string().required()
        })

        try {
            await reserveSchema.validate(data)
            return {error: false}
        } catch (error) {
            return CommonError.build(error.errors)
        }
    }
}

export {reserveSchemaValidation}