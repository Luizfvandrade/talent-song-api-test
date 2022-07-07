import express from 'express';
import 'express-async-errors';
import { router as routes } from './routes';
import { Request, Response } from 'express';

const port = process.env.PORT || 3000;

import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => res.json({ message: 'Server is up running!' }));
app.listen(port, () => console.log(`Server is up running in port: ${port}!`));
