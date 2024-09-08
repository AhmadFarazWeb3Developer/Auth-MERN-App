import Joi from "joi";

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(3).max(100).required(),
  });
  console.log("Login Validation");
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "bad request found",
      error,
    });
  }
  next();
};

export { loginValidation };
