import { Request, Response, Router } from 'express';

import { IsAuthenticated, can, is } from './middlewares/index';
import {
    CreateRolePermissionsController,
    CreatePermissionControler,
    GetAllUsersController,
    CreateRoleController,
    SessionController,
    CreateUserRolesControler,
} from './controllers/index';
import { UserController } from './controllers/UserController';
import { createUserController } from './application/usecases/createUser';

const routes = Router();

routes.get('/users', new GetAllUsersController().handle);


routes.post('/login', new SessionController().handle);

// rolas de criar tabelas de pontas 
routes.post('/roles', IsAuthenticated(), new CreateRoleController().handle);
routes.post('/permissions', IsAuthenticated(), new CreatePermissionControler().handle);
routes.post('/users', IsAuthenticated(), (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});

routes.get('/users/roles', IsAuthenticated(), new UserController().handle);

routes.post('/roles/:roleId', IsAuthenticated(), is(['admin']), new CreateRolePermissionsController().handle);
routes.post('/users/userroles', IsAuthenticated(), is(['super_admin']), new CreateUserRolesControler().handle);


export { routes };