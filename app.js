const express = require("express");
const logger = require("morgan");
const laptopRouter = require("./routes/laptopRoutes");
const cors = require("cors");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + "public"));

app.use("/api/v1/laptops", laptopRouter);

module.exports = app;
