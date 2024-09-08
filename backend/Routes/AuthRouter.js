import { Router } from "express";
const AuthRouter = Router();
import { signupValidation } from "../Middlewares/signupValidation.js";
import { loginValidation } from "../Middlewares/loginValidation.js";
import { signUp } from "../Controllers/signupController.js";
import { login } from "../Controllers/loginContoller.js";

AuthRouter.post("/login", loginValidation, login);
AuthRouter.post("/signup", signupValidation, signUp);

export { AuthRouter };
