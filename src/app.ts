import express from 'express';
import 'express-async-errors';
import { router as routes } from './routes';

import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3000, () => console.log('Server is up running!'));
