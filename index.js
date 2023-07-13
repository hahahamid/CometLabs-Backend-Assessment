const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const questionRoutes = require("./routes/questionRoutes");
const testCaseRoutes = require("./routes/testCaseRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const authMiddleware = require(".//middleware/authMiddleware");
const axios = require("axios");


require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection setup
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


// Setting Up Routes

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/questions", questionRoutes);
app.use("/testcases", testCaseRoutes);
app.use("/solutions", solutionRoutes);


app.get("/", authMiddleware, (req, res) => {
  
  // Greeting Message on the homepage with name and the role 

  res.send(`Hello ${req.user.name}! You are a ${req.user.role}.`);

});


// Starting The Server

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
