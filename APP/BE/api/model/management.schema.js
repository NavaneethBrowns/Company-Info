import mongoose from "mongoose";

const managementSchema = mongoose.Schema({
    managementName: {
        type: String,
        required: true
    },
    managementDesignation: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    linkedIn: {
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

export const managementModel = mongoose.model('management',managementSchema);