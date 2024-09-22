import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { DB_NAME } from "../Constants/database.js";
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);
console.log(DB_NAME);

mongoose
  .connect(
    `${MONGO_URL}/${DB_NAME}?retryWrites=true&w=majority&authSource=admin`
  )
  .then(() => {
    console.log("Monogo DB Connected", mongoose.connection.host);
  })
  .catch((error) => {
    console.log("Connection error : ", error);
  });
