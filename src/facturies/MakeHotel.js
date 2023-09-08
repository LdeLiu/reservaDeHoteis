import {Hotel} from '../domain/Hotel.js'
import { HotelRepository } from "../app/hotel/repository/hotelRepository.js";
import { HotelService } from '../app/hotel/service/hotelService.js';
import { HotelController } from '../app/hotel/controller/hotelController.js';

class MakeHotel{
    static getInstance(){
        const repository = new HotelRepository(Hotel)
        const service = new HotelService(repository)
        const controller = new HotelController(service)

        return controller
    }
}

export{ MakeHotel }