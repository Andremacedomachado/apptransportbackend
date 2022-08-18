import { Router } from 'express';

import { IsAuthenticated, can, is } from './middlewares/index';
import {
    CreateRolePermissionsController,
    CreatePermissionControler,
    GetAllUsersController,
    CreateRoleController,
    CreateUserController,
    SessionController,
    CreateUserRolesControler,
} from './controllers/index';

const routes = Router();

routes.get('/users', new GetAllUsersController().handle);


routes.post('/login', new SessionController().handle);

// rolas de criar tabelas de pontas 
routes.post('/roles', IsAuthenticated(), new CreateRoleController().handle);
routes.post('/permissions', IsAuthenticated(), new CreatePermissionControler().handle);
routes.post('/users', IsAuthenticated(), new CreateUserController().handle);

routes.post('/roles/:roleId', IsAuthenticated(),  is(['admin']), new CreateRolePermissionsController().handle);
routes.post('/users/userroles',  IsAuthenticated(), is(['super_admin']),new CreateUserRolesControler().handle);


export { routes };