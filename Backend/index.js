require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./Routes/UserRoutes");

const app = express();
const PORT = process.env.PORT || 8888;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is working" });
});

app.use("/pages", routes);

// 404 handler — catches any route that didn't match above
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Centralized error handler — catches anything thrown / passed to next(err)
// in controllers or middleware, instead of crashing the server.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server is running fine at ${PORT}`);
});
