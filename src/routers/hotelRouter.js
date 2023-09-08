import { Router } from "express";
import { MakeHotel } from "../facturies/MakeHotel.js";

const hotelRouter = Router()
const controller = MakeHotel.getInstance()

hotelRouter.post('/hotels', controller.create.bind(controller))

export {hotelRouter}