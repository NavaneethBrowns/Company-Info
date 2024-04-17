import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    websiteURL: {
        type: String,
    },
    companyName: {
        type: String,
        required: true
    }
},
{
    timeStamps: true
});

export const productModel =  mongoose.model('product',productSchema);