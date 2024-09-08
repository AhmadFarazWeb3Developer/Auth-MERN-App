import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
const ensureAuthenticatedUser = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({
      message:
        "Unauthorized User, JWT Token required, Otherwise you cannot access others products ",
    });
  }
  try {
    const dedcodedData = jwt.verify(auth, process.env.JWT_TOKEN_SECRET);
    req.user = dedcodedData;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, jwt token wrong or expired",
    });
  }
};
export { ensureAuthenticatedUser };
