import express from 'express'
import { addCompany, listCompanies, getCompany } from '../controllers/company.controller.js';

const appRoutes = express.Router();

appRoutes
    .post('/addCompany', addCompany)
    .get('/getCompanies', listCompanies)
    .get('/getCompany/:companyName', getCompany);

export default appRoutes;