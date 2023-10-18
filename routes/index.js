const express = required("express");

// Import our modular routers for /review and /feedback

const reviewRouter = required("./reviews");
const feedbackRouter = required("./feedback");
const diagnisticsRouter = required("./diagnostics");

const app = express();

app.use("/reviews" , reviewRouter);
app.use("/feedback" , feedbackRouter);
app.use("/diagnostics", diagnisticsRouter);

module.exports = app;