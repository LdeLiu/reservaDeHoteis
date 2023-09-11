import { describe, expect, jest } from '@jest/globals'
import {ReserveService} from './reserveService.js'
import { CommonError } from '../../../utils/commonError.js'

const reserveRepositoryMock = {
    create: () => Promise.resolve({}),
    findById: () => Promise.resolve({}),
    delete: () => Promise.resolve({})
}
const userRepositoryMock = {
    addReserves: () => Promise.resolve({}),
    findById: () => Promise.resolve({}),
    removeReserve: () => Promise.resolve({})
}
const hotelRepositoryMock = {
    findById: () => Promise.resolve({}),
    updateRooms: () => Promise.resolve({})
}

const sut = new ReserveService(reserveRepositoryMock,userRepositoryMock,hotelRepositoryMock)

describe('ReserveService',() => {
    describe('create',() => {
        it('should return the message "hotel not found" when receiving incorrect hotel', async () => {
            const dataMock = {}
            
            const expectedResult = {
                error: true,
                message: "hotel not found"
            }
    
            jest.spyOn(hotelRepositoryMock, 'findById').mockResolvedValue(false)
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: "hotel not found"})
    
            const result = await sut.create(dataMock)
    
            expect(result).toStrictEqual(expectedResult)
        })
        it('should return the "not rooms available" message when searching for a hotel that has no rooms available', async () => {
            const dataMock = {}
    
            const returnFromFind = {
                avaliableRooms: 0
            }
    
            const expectedResult = {
                error: true,
                message: "not rooms available"
            }
    
            jest.spyOn(hotelRepositoryMock, 'findById').mockResolvedValue(returnFromFind)
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: "not rooms available"})
    
            const result = await sut.create(dataMock)
    
            expect(result).toStrictEqual(expectedResult)
    
        })
        it('should return the "date checkIn is out of range" message when the check-in date is greater than the check-out date', async () => {
            const dataMock = {
                checkIn: '1996/07/08',
                checkOut: '1996/07/07'
            }
    
            const returnFromFind = {
                avaliableRooms: 1
            }
    
            const expectedResult = {
                error: true,
                message: "date checkIn is out of range"
            }
    
            jest.spyOn(hotelRepositoryMock, 'findById').mockResolvedValue(returnFromFind)
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: "date checkIn is out of range"})
    
            const result = await sut.create(dataMock)
    
            expect(result).toStrictEqual(expectedResult)
    
        })
        it('should return the object data created from new reserve', async () => {
            const dataMock = {
                checkIn: '1996/07/06',
                checkOut: '1996/07/07'
            }
    
            const returnFromFind = {
                avaliableRooms: 1
            }
    
            const expectedResult = {
                message: "created sucessfully",
            }
    
            jest.spyOn(hotelRepositoryMock, 'findById').mockResolvedValue(returnFromFind)
            jest.spyOn(reserveRepositoryMock, 'create').mockResolvedValue({ message: "created sucessfully" })
    
            const result = await sut.create(dataMock)
    
            expect(result).toStrictEqual(expectedResult)
    
        })
    })

    describe('getReserves', () => {
        it('should return the "User not found" message when id not exists', async () => {
            const idMock = 1
            const expectedResult = {
                error: true,
                message: "User not found"
            }

            jest.spyOn(userRepositoryMock, 'findById').mockResolvedValue(false)
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: "User not found"})

            const result = await sut.getReserves(idMock)

            expect(result).toStrictEqual(expectedResult)
        })
        it('should return the object with data of reserves from user', async () => {
            const idMock = 1
            const expectedResult = {reserve1: '1',reserve2: '2'}

            jest.spyOn(userRepositoryMock, 'findById').mockResolvedValue({reserves: {reserve1: '1',reserve2: '2'}})

            const result = await sut.getReserves(idMock)

            expect(result).toStrictEqual(expectedResult)
        })
    })

    describe('cancelReserves', () => {
        it('should return the "Reserve not found" message when id not exists', async () => {
            const idMock = 1
            const expectedResult = {
                error: true,
                message: "Reserve not found"
            }

            jest.spyOn(reserveRepositoryMock, 'findById').mockResolvedValue(false)
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: "Reserve not found"})

            const result = await sut.cancelReserves(idMock)

            expect(result).toStrictEqual(expectedResult)
        })
        it('should return the "Reserve not found" message when id not exists', async () => {
            const idMock = 1
            const expectedResult = {
                error: true,
                message: "the cancellation period has expired"
            }

            jest.spyOn(reserveRepositoryMock, 'findById').mockResolvedValue({checkIn: new Date("2023/09/09")})
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: "the cancellation period has expired"})

            const result = await sut.cancelReserves(idMock)

            expect(result).toStrictEqual(expectedResult)
        })
        it('should return the reservation cancellation information', async () => {
            const idMock = 1
            const expectedResult = {
                message: "cancellation successful"
            }

            jest.spyOn(reserveRepositoryMock, 'findById').mockResolvedValue({checkIn: new Date("2024/09/09")})
            jest.spyOn(reserveRepositoryMock, 'delete').mockResolvedValue({message: 'cancellation successful'})

            const result = await sut.cancelReserves(idMock)

            expect(result).toStrictEqual(expectedResult)
        })

    })
})