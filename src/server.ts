console.log('BASE_URL', process.env.BASE_URL)
import express, { Express } from 'express';
import routes from './routes';
const cors = require('cors');

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

console.log()
export default app;