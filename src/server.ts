const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swaggerConfig');
import express, { Express } from 'express';
import { auth } from 'express-openid-connect';
import authConfig from './config/authConfig';
import routes from './routes';
const cors = require('cors');

const app: Express = express();

//app.use(auth(authConfig));
app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


console.log()
export default app;