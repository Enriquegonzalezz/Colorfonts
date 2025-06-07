const {Router} = require('express');
const {UsersController} = require('./usersController');

const createUsersRouter = () => {
    const usersRouter = Router();
    const usersController = new UsersController();
    
    usersRouter.post('/login', usersController.login);
    usersRouter.post('/register', usersController.register);
    usersRouter.get('/auth', usersController.getAuth);

    return usersRouter;
}

module.exports = {createUsersRouter};