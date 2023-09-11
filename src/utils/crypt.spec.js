import { expect, jest } from "@jest/globals"
import {Crypt} from './crypt.js'
import bcrypt from 'bcrypt'

describe('Crypt', () => {
    it('should return hash by password', () => {
        const dataMock = {}
        const expectedResult = {hash: 'abc'}

        jest.spyOn(bcrypt, 'hashSync').mockReturnValue({hash: 'abc'})

        const result = Crypt.encrypt(dataMock)

        expect(result).toStrictEqual(expectedResult)
    })
    it('should return the result an check between password and hash ', () => {
        const expectedResult = true

        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true)

        const result = Crypt.compare({},{})

        expect(result).toStrictEqual(expectedResult)
    })
})