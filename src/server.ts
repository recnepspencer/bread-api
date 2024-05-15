console.log('BASE_URL', process.env.BASE_URL)
import express, { Express } from 'express';
import routes from './routes';
import connectDatabase from './config/database';
import authConfig from './config/auth';
const {auth} = require('express-openid-connect'); 

const app: Express = express();
app.use(express.json());
app.use(auth(authConfig));
app.use('/', routes);

console.log()
export default app;