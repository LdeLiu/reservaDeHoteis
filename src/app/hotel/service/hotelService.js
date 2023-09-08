import { CommonError } from '../../../utils/commonError.js'

class HotelService{
    constructor(repository){
        this.repository = repository;
    }

    async create(data){
        const hotelAreadyExists = await this.repository.findHotel(data.name, data.address)
        if(hotelAreadyExists){
            return CommonError.build('Hotel already exists')
        }
        const result = await this.repository.create(data)
        return result
    }
}

export {HotelService}