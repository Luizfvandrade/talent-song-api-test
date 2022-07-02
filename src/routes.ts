import { Router } from 'express';

import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import { UserController } from './controllers/userController';
import { AuthController } from './controllers/authController';
import { FavoriteSongController } from './controllers/favoriteSongController';
import { HealthCheckController } from './controllers/healthCheckController';

import { ensureAuth } from './middlewares/ensureAuth';

const router = Router();
const swaggerDocument = YAML.load('./swagger.yml');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const userController = new UserController();
const authController = new AuthController();
const favoriteSongController = new FavoriteSongController();
const healthCheckController = new HealthCheckController();

router.post('/login', authController.login);

router.post('/user', userController.create);

router.post('/favorite-songs', ensureAuth, favoriteSongController.save);
router.get('/favorite-songs', ensureAuth, favoriteSongController.find);
router.put('/favorite-songs/:id', ensureAuth, favoriteSongController.update);
router.delete('/favorite-songs/:id', ensureAuth, favoriteSongController.delete);

router.get('/healthCheck', healthCheckController.status);

export { router };
