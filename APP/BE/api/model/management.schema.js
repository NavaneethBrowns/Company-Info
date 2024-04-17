import mongoose, { Collection } from "mongoose";

const managementSchema = mongoose.Schema({
    managementName: {
        type: String,
    },
    managementDesignation: {
        type: String,
    },
    summary: {
        type: String,
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
    collection: 'management',
    strict: true,
    versionKey: false,
    timestamps: true,
});

export const managementModel = mongoose.model('management',managementSchema);