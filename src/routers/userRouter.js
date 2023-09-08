import { Router } from "express"; 
import { MakeUser } from '../facturies/MakeUser.js'

const userRouter = Router()
const controller = MakeUser.getInstance()

userRouter.post('/users', controller.create.bind(controller))
userRouter.post('/users/singin', controller.singIn.bind(controller))

export {userRouter}
