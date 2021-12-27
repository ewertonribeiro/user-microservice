import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './../useCases/CreateUserUseCase';
import { ListAllUsersUseCase } from './../useCases/ListAllUsersUseCase';
import { UserRepository } from './../Repositories/IUserRepositoryImplementations';
import {ListAllUserController} from './ListAllUsersController'
import {FindUserByEmailUseCase as EmailUseCase} from '../useCases/FindUserByEmailUseCase'
import { FindUserByEmailController as EmailController } from './FindUserByEmailController';
import { UpdatePasswordUseCase as UpdatePassword } from '../useCases/UpdatePasswordUseCase';
import { UpdatePasswordController as UpdateController } from './UpdatePasswordController';
import {DeleteUserUseCase as DeleteUseCase} from '../useCases/deleteUserUseCase';
import {DeleteUserController as DeleteController} from './DeleteUserController'


//Database 
const UserRepositories =  UserRepository.getInstance()


//////List all Users Instance

export const ListAllUserUseCase = new ListAllUsersUseCase(UserRepositories);
const ListAllUsercontroller = new ListAllUserController(ListAllUserUseCase)


///CreateUserController

const CreateuserUseCase = new CreateUserUseCase(UserRepositories);
const CreateuserController = new CreateUserController(CreateuserUseCase)


///FindUserByEmail

const FindUserByEmailUseCase = new EmailUseCase(UserRepositories);
const FindUserByEmailController = new EmailController(FindUserByEmailUseCase)


///UpdatePassword

const UpdatePasswordUseCase = new UpdatePassword(UserRepositories)
const UpdatePasswordController = new UpdateController(UpdatePasswordUseCase)


////DeleteUser

const DeleteUserUseCase = new DeleteUseCase(UserRepositories);
const DeleteUserController = new DeleteController(DeleteUserUseCase)

export {ListAllUsercontroller , CreateuserController , FindUserByEmailController , UpdatePasswordController , DeleteUserController};