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
      console.error(error);
      return res.status(500).json({ message: 'Error adding company info' });
    }
}

export const listCompanies = async (req, res) => {
  try {
    var { page = 1, limit = 10, search } = req.query;
    page = Number(page);
    limit = Number(limit);
    let skip = (Number(page) - 1) * Number(limit);

    const pipeline = [
      { $sort: { companyName: 1 } },
      { $skip: skip },
      { $limit: limit },
      { $project: { companyName: 1 } }
    ];

    if (search) {
      pipeline.unshift({
        $match: { companyName: { $regex: new RegExp(search, "i") } },
      });
    }

    console.log(pipeline);

    const companies = await companyModel.aggregate(pipeline);
    const totalCount = await companyModel.countDocuments(
      search ? { companyName: { $regex: new RegExp(search, "i") } } : {}
    );

    return res.status(200).json({ companies, totalCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching companies" });
  }
};  
  
export const getCompany = async (req,res) => {
    try {

        const company = companyModel.find({companyName: req.params});
        if(!company) {
            return res.status(204).json('No such company!');
        }

        return res.status(200).json('Company fetched Successfully!');
    } catch (error) {        
      console.error(error);
      return res.status(500).json({ message: 'Error fetching company' });
    }
}

