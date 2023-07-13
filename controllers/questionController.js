const Question = require("../models/Question");
var axios = require("axios");

// function to display all the problems directly from Sphere Online API

async function getAllQuestions(req, res) {
  try {
    await axios
      .get(
        process.env.SPHERE_PROBLEMS_URL +
          "?access_token=" +
          process.env.SPHERE_PROBLEMS_TOKEN
      )
      .then((response) => {
        res.send(response.data);
        // console.log(response.data);
      });
  } catch (error) {
    
    console.error("Error getting questions:", error);
    
    // error message 
    res.status(500).send({ message: "Internal server error" });
  }
}


module.exports = { getAllQuestions };
