import {DecodeJWT} from '../../../utils/decodeJWT.js'
import { reserveSchemaValidation } from '../../../utils/validation/reserveSchema.js'

class ReserveController{
    constructor(service){
        this.service = service;
    }

    async create(req,res){
        const {body} = req
        const token = req.headers.authorization
        const newData = {
            ...body,
            user: DecodeJWT.Payload(token)._id
        }

        const dataIsValid = await reserveSchemaValidation.isValid(newData)
        if(dataIsValid.error === true){
            return res.status(400).json(dataIsValid)
        }

        const result = await this.service.create(newData)
        return res.status(result.error ? 400 : 200).json(result)
    }

    async getReserves(req,res){
        const token = req.headers.authorization
        const idUser = DecodeJWT.Payload(token)._id
        if(!idUser){
            return res.status(400).json('params missing')
        }
        const result = await this.service.getReserves(idUser)
        return res.status(result.error ? 400 : 200).json(result)
    }

    async cancelReserves(req,res){
        const idReserve = req.params.id
        if(!idReserve){
            return res.status(400).json('params missing')
        }
        const result = await this.service.cancelReserves(idReserve)
        return res.status(result.error ? 400 : 200).json(result)
    }
}

export {ReserveController}