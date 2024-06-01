const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swaggerConfig');
import express, { Express } from 'express';
import routes from './routes';
const cors = require('cors');
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log()
export default app;