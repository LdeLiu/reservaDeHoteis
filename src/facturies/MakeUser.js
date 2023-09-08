import { UserController } from "../app/user/controller/userController.js";
import { UserRepository } from "../app/user/repository/userRepository.js";
import { UserService } from "../app/user/service/userService.js";
import { User} from '../domain/User.js'

class MakeUser{
    static getInstance(){
        const repository = new UserRepository(User)
        const service = new UserService(repository)
        const controller = new UserController(service)

        return controller
    }
}

export {MakeUser}