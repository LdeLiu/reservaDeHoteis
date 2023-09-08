import { Router } from "express";
import { MakeReserve } from "../facturies/MakeReserve.js";

const reserveRouter = Router()
const controller = MakeReserve.getInstance()

reserveRouter.post('/reserves', controller.create.bind(controller))
reserveRouter.get('/reserves/userReserves', controller.getReserves.bind(controller))
reserveRouter.delete('/reserves/delete/:id', controller.cancelReserves.bind(controller))

export {reserveRouter}