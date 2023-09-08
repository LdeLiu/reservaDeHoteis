import { CommonError } from '../../../utils/commonError.js'

class ReserveService{
    constructor(reserveRepository,userRepository,hotelRepository){
        this.reserveRepository = reserveRepository;
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
    }

    async create(data){
        const hotelAreadyExists = await this.hotelRepository.findById(data.hotel)
        if(!hotelAreadyExists){
            return CommonError.build('hotel not found')
        }

        if(hotelAreadyExists.avaliableRooms <= 0){
            return CommonError.build('not rooms available')
        }

        const checkIn = new Date(data.checkIn.split('/'))
        const checkOut = new Date(data.checkOut.split('/'))
        if(checkIn.getTime() > checkOut.getTime()){
            return CommonError.build('date checkIn is out of range')
        }

        const dataReserve = {
            ...data,
            checkIn,
            checkOut
        }

        const newReserve = await this.reserveRepository.create(dataReserve)
        await this.hotelRepository.updateRooms(data.hotel,hotelAreadyExists.avaliableRooms -1)
        await this.userRepository.addReserves(data.user,newReserve._id)
        return newReserve
    }

    async getReserves(id){
        const userAreadyExists = await this.userRepository.findById(id)
        if(!userAreadyExists){
            return CommonError.build('User not found')
        }
        return userAreadyExists.reserves
    }

    async cancelReserves(id){
        const reserveAreadyExists = await this.reserveRepository.findById(id)
        if(!reserveAreadyExists){
            return CommonError.build('Reserve not found')
        }
        
        if((reserveAreadyExists.checkIn.getTime()) < new Date().getTime()){
            return CommonError.build('the cancellation period has expired')
        }

        const idUser = reserveAreadyExists.user
        const idHotel = reserveAreadyExists.hotel
        const dataHotel = await this.hotelRepository.findById(idHotel)

        const result = await this.reserveRepository.delete(id)
        await this.userRepository.removeReserve(idUser,id)
        await this.hotelRepository.updateRooms(idHotel, (dataHotel.avaliableRooms + 1))
        return result

    }
}

export {ReserveService}