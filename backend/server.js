import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import bodyParser from "body-parser"; //used for sending POST data from client to server
import cors from "cors";
import "./Models/dbConnection.js";
import { AuthRouter } from "./Routes/AuthRouter.js";
import { ProductRouter } from "./Routes/ProductRouter.js";
const app = express();

app.use(bodyParser.json());
app.use(cors()); //any one can request from world this data to server

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is runing");
});
