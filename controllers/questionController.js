const Question = require("../models/Question");
var axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware"); 

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
    res.status(500).send({ message: "Internal server error" });
  }
}



module.exports = { getAllQuestions };
