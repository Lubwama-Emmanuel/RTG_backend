const express = require("express");
const logger = require("morgan");
const laptopRouter = require("./routes/laptopRoutes");

const app = express();

app.use(logger("dev"));

app.use("/api/v1/laptops", laptopRouter);

module.exports = app;
