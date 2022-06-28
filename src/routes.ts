import { Router } from 'express';
import { UserController } from './controllers/userController';
import { AuthController } from './controllers/authController';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post('/login', authController.login);

router.post('/user', userController.create);

export { router };
