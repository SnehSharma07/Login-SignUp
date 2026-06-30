const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const SECRET_KEY = process.env.JWT_SECRET || "acharya";
const TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || "365d";

// In-memory "database". Resets on every server restart — swap for a real
// database (MongoDB/Postgres/etc.) when this needs to persist users.
let users = [];

const isValidEmail = (email) => typeof email === "string" && /\S+@\S+\.\S+/.test(email);

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!isValidEmail(email) || !password) {
      return res.status(400).json({ msg: "A valid email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    const existing = users.find((item) => item.email === email);
    if (existing) {
      return res.status(409).json({ msg: "This email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    users.push({ email, password: hashedPassword });

    const token = jwt.sign({ user: email }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });

    return res.status(201).json({ msg: "User registered successfully", token });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!isValidEmail(email) || !password) {
      return res.status(400).json({ msg: "A valid email and password are required" });
    }

    const account = users.find((item) => item.email === email);
    if (!account) {
      return res.status(404).json({ msg: "User is not registered" });
    }

    const passwordMatches = await bcrypt.compare(password, account.password);
    if (!passwordMatches) {
      return res.status(401).json({ msg: "Password is incorrect" });
    }

    const token = jwt.sign({ user: email }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
    return res.status(200).json({ msg: "User logged in successfully", token });
  } catch (err) {
    return next(err);
  }
};

const home = (req, res) => {
  res.status(200).json({ message: "This is the Home page" });
};

const dashboard = (req, res) => {
  res.status(200).json({ msg: `Welcome to your Dashboard, ${req.user?.user || "user"}` });
};

module.exports = { login, register, home, dashboard };
