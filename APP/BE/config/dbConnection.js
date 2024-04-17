import mongoose from "mongoose";

export const dbConnect = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to ${connect.connection.host} - ${connect.connection.port}`);
    } catch (error) {
        console.log(error);
    }
}