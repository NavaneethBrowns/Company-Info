import { companyModel } from "../model/company.schema.js";
import { managementModel } from "../model/management.schema.js";
import { productModel } from "../model/product.schema.js";

export const addCompany = async (req,res) => {
    try {
        const InputData = req.body;

        const companyName = InputData.companyName;

        if(InputData.management && InputData.management.length) {
            InputData.management = InputData.management.map(x=> x.companyName = companyName);
        }
        
        if(InputData.products && InputData.products.length) {
            InputData.products = InputData.products.map(x=> x.companyName = companyName);
        }

        const company = await companyModel.create(InputData);
        const products = await productModel.create(InputData.products);
        const management = await managementModel.create(InputData.management);

        if(company && products && management) {
            return res.status(200).json('Created Successfully!');
        } else {
            return res.status(400).json('Unable to add company info!');
        }
        
    } catch (error) {
        
    }
}

export const listCompanies = async (req,res) => {
    try {
        
        const companies = await companyModel.aggregate([

        ] )

        return res.status(200).json(companies);
    } catch (error) {
        
    }
}

export const getCompany = async (req,res) => {
    try {

        const company = companyModel.find({companyName: req.params});
        if(!company) {
            return res.status(204).json('No such company!');
        }

        return res.status(200).json('Company fetched Successfully!');
    } catch (error) {
        
    }
}

