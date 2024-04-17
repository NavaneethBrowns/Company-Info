import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    companyContact: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
    },
    logo: {
        type: String,
    },
    brief: {
        type: String,
        required: true
    },
    mission: {
        type: String,
    },
    socialURL: {
        type: String,
    },
    keyContact: {
        type: Object({
            name: {
                type: String,
                required: true
            },
            designation: {
                type: String,
                required: true
            },
            countryCode: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
        }),
        required: true        
    }
},
{
    collection: "company",
    strict: true,
    versionKey: false,
    timestamps: true,
});

export const companyModel = mongoose.model('company',companySchema);