import express from 'express'
import dotenv from 'dotenv';
import { dbConnect } from './config/dbConnection.js';
import appRoutes from './api/routes/appRoutes.js';
const PORT = process.env.PORT || 3000;

dotenv.config();

dbConnect();

const app = express();

app.use('/', appRoutes);

app.listen(PORT,()=>{
    try {
        console.log(`App Running on ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})
