const TestCase = require("../models/TestCase");
const axios = require("axios");


async function addTestCase(req, res) {
  if (req.user.role == "admin") {
    
    await axios.post(process.env.SPHERE_PROBLEMS_URL + "/" + req.body.id + "/" + "testcases?access_token=" + process.env.SPHERE_PROBLEMS_TOKEN,
        {
          input: req.body.input,
          output: req.body.output,
          judgeId: 1,
        }
      )
      .then(async (response) => {
        res.json({status: response.status, statusText: response.statusText, data: response.data}); 
        
      })

      .catch((error) => {
        res.status(400).send(error);
      });
  } 
  else {
    res.send("You are not an Admin! You are not authorized to add a testcase!");
  }
}

module.exports = { addTestCase };
