import { UserModel } from "../models/User.model.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  try {
    console.log("signup controller");
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    const userModel = new UserModel({
      name,
      email,
      password,
    });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(201).json({
      message: "Signup Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export { signUp };
