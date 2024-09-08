import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
const jwt = JsonWebToken;
import { UserModel } from "../models/User.model.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMessage = "Auth Failed email or password is wrong";

    if (!user) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const jwtToken = await jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login Successful",
      jwtToken,
      email,
      name: user.name,
      success: true,
    });
  } catch (error) {
    console.log("Error while Loging-In ", error);
  }
};

export { login };
