import { describe, expect, jest } from "@jest/globals"
import { UserService } from "./userService"
import { CommonError } from "../../../utils/commonError"
import { Crypt } from "../../../utils/crypt"
import Jwt from "jsonwebtoken"


const repository = {
    findByEmail: () => Promise.resolve({}),
    create: () => Promise.resolve({})
}

const sut = new UserService(repository)

describe('UserService', () => {
    describe('create', () => {
        it('should return "User already exists" message when received an email existin', async () => {
            const dataMock = {}

            const expectedResult = {error: true, message: 'User already exists'}

            jest.spyOn(repository, 'findByEmail').mockResolvedValue(true)
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: 'User already exists'})

            const result = await sut.create(dataMock)

            expect(result).toStrictEqual(expectedResult)
        })
        it('should return an object with data of new user created', async () => {
            const dataMock = {}

            const expectedResult = {message: 'created successfully'}

            jest.spyOn(repository, 'findByEmail').mockResolvedValue(false)
            jest.spyOn(Crypt, 'encrypt').mockReturnValue('')
            jest.spyOn(repository, 'create').mockResolvedValue({message: 'created successfully'})

            const result = await sut.create(dataMock)

            expect(result).toStrictEqual(expectedResult)
        })
    })

    describe('singIn', () => {
        it('should return "invalid credentials" message with received an incorrect email', async () => {
            const dataMock = {}
            const expectedResult = {error: true, message: 'invalid credentials'}

            jest.spyOn(repository, 'findByEmail').mockResolvedValue(false)
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: 'invalid credentials'})

            const result = await sut.singIn(dataMock)

            expect(result).toStrictEqual(expectedResult)
        })
        it('should return "invalid credentials" message with received an incorrect password', async () => {
            const dataMock = {}
            const expectedResult = {error: true, message: 'invalid credentials'}

            jest.spyOn(repository, 'findByEmail').mockResolvedValue(true)
            jest.spyOn(Crypt, 'compare').mockReturnValue(false)
            jest.spyOn(CommonError, 'build').mockReturnValue({error: true, message: 'invalid credentials'})

            const result = await sut.singIn(dataMock)

            expect(result).toStrictEqual(expectedResult)
        })
        it('should return the token message when received all credentials valid', async () => {
            const dataMock = {}
            const expectedResult = {token: 'token'}

            jest.spyOn(repository, 'findByEmail').mockResolvedValue(true)
            jest.spyOn(Crypt, 'compare').mockReturnValue(true)
            jest.spyOn(Jwt, 'sign').mockReturnValue({token: 'token'})

            const result = await sut.singIn(dataMock)

            expect(result).toStrictEqual(expectedResult)
        })
    })
})
