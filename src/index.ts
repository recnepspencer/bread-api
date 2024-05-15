import dotenv from 'dotenv';
dotenv.config({path: './.env'});
import app from "./server";
import connectDatabase from './config/database';

const port = process.env.PORT || 3000;

// Connect to the database then start the server
connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
});