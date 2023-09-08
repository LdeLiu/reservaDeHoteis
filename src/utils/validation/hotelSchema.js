import * as yup from "yup";
import { CommonError } from "../commonError.js";

class hotelSchemaValidation {
    static async isValid(data){
        const hotelSchema = yup.object().shape({
            name: yup.string().required(),
            address: yup.string().required()
        })

        try {
            await hotelSchema.validate(data)
            return {error: false}
        } catch (error) {
            return CommonError.build(error.errors)
        }
    }
}

export {hotelSchemaValidation}