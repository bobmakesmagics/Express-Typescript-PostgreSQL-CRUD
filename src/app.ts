import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import applicantRoutes from './routes/applicant.routes';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/awesome/applicant', applicantRoutes);

app.use('/', (req: Request, res: Response, next: NextFunction): void => {
  res.send('Welcome to the CRUD App!');
});

export default app;
