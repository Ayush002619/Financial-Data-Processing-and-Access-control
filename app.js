const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
const rateLimit = require("express-rate-limit");


//rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Too many requests, please try again later"
    }
});

const authRoutes = require("./routes/authroutes");
const testRoutes = require("./routes/testRoutes");
const recordRoutes = require("./routes/recordRoutes");
const budgetRoutes = require("./routes/budgetRoutes");


app.use("/budget", budgetRoutes);

app.use("/records", recordRoutes);

app.use("/test", testRoutes);

app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.send("API is working...........");
});
module.exports = app;