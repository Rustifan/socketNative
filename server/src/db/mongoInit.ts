import mongoose from "mongoose";
import { MONGO_DB, MONGO_URL } from "../constants";

export default async function mongoInit(){
    try{
        await mongoose.connect(`${MONGO_URL}/${MONGO_DB}`);
        console.log("connected to "+ `${MONGO_URL}/${MONGO_DB}`);
    }catch(error){
        console.log("failed to connect to mongo server")
    }
}