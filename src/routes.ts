import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { GetAllUsersController } from './controllers/GetAllUsersController';


const routes = Router();

routes.get('/', new GetAllUsersController().handle);
routes.post('/user', new CreateUserController().handle);


export { routes };