import { HotelRepository } from "../app/hotel/repository/hotelRepository.js";
import { ReserveController } from "../app/reserve/controller/reserveController.js";
import { ReserveRepository } from "../app/reserve/repository/reserveRepository.js";
import { ReserveService } from "../app/reserve/service/reserveService.js";
import { UserRepository } from "../app/user/repository/userRepository.js";
import { Hotel } from "../domain/Hotel.js";
import { Reserve } from '../domain/Reserve.js'
import { User } from '../domain/User.js'

class MakeReserve{
    static getInstance(){
        const reserveRepository = new ReserveRepository(Reserve)
        const userRepository = new UserRepository(User)
        const hotelRepository = new HotelRepository(Hotel)

        const service = new ReserveService(reserveRepository, userRepository, hotelRepository)
        const controller = new ReserveController(service)

        return controller
    }
}

export {MakeReserve}