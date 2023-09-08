import { hotelSchemaValidation } from '../../../utils/validation/hotelSchema.js'

class HotelController{
    constructor(service){
        this.service = service;
    }

    async create(req,res){
        const { body } = req
        const bodyIsValid = await hotelSchemaValidation.isValid(body)
        if(bodyIsValid.error == true){
            return res.status(400).json(bodyIsValid)
        }

        const result = await this.service.create(body)
        return res.status(result.error ? 400 : 200).json(result)
    }
}

export {HotelController}