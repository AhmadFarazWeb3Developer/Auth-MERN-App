import { Router } from "express";
import { ensureAuthenticatedUser } from "../Middlewares/productUserValidation.js";
const ProductRouter = Router();

ProductRouter.get("/", ensureAuthenticatedUser, (req, res) => {
  console.log("Logged in user details", req.user);

  res.status(200).json([
    {
      name: "Mobile",
      price: 10000,
    },
    {
      name: "TV",
      price: 30000,
    },
  ]);
});

export { ProductRouter };
