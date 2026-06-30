const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "acharya";

const auth = (req, res, next) => {
  const header = req.headers["authorization"];

  // Guard against a missing header entirely, instead of crashing on
  // `undefined.split(...)`.
  if (!header) {
    return res.status(401).json({ msg: "Authorization header is missing" });
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ msg: "Authorization header must be: Bearer <token>" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    req.user = decoded; // make the decoded payload available to controllers
    return next();
  });
};

module.exports = auth;
