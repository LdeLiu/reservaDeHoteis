import { describe, expect, jest } from '@jest/globals'
import {HotelService} from './hotelService.js'

const repositoryMock = {
    findHotel: (name, address) => Promise.resolve({}),
    create: (data) => Promise.resolve({})
}

const sut = new HotelService(repositoryMock)

describe('HotelService', () => {
    it('should be able to create a new hotel, returning the created object', async () => {
        const paramsDataMock = {
            name: 'teste',
            address: 'teste'
        }

        const expectedResult = {
            name: 'teste',
            address: 'teste'
        }

        jest.spyOn(repositoryMock, 'findHotel').mockResolvedValue(false)
        jest.spyOn(repositoryMock, 'create').mockResolvedValue(paramsDataMock)

        const result = await sut.create(paramsDataMock)

        expect(result).toStrictEqual(expectedResult)
    })

    it('should return an error message if it finds the data passed by parameter in the database', async () => {
        const paramsDataMock = {
            name: 'teste',
            address: 'teste'
        }

        const CommonError = {
            build: (msg) => {return ''}
        }

        jest.spyOn(repositoryMock, 'findHotel').mockResolvedValue(true)
        jest.spyOn(CommonError, 'build').mockResolvedValue({error: true, message: 'Hotel already exists'})

        const result = await sut.create(paramsDataMock)

        expect(result).toStrictEqual({error: true, message: 'Hotel already exists'})
    })
})
