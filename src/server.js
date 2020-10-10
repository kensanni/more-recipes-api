import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import config from './config';

dotenv.config();

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

routes(app);

app.all("*", (req, res) => {
  res.status(404).send({
    message: 'Route does not exist'
  });
});

export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error(error);
  }
};

