const express = require('express');

const { clog } = require("../middleware/clog");


// Import our modular routers for /review and /feedback

const reviewRouter = require("./reviews");
const feedbackRouter = require("./feedback");


const app = express();

app.use("/reviews", reviewRouter);
app.use("/feedback", feedbackRouter);

// Initialize custom middleware
app.use(clog);


module.exports = app;