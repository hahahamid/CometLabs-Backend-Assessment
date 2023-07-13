const axios = require("axios");


// Function to display message based on the result 

async function submissionMessage(response, req, res) {
  const { data } = response;
  if (data.result === "OK") {
    res.send({ message: "Solution is correct" });
  } else {
    res.send({ message: "Solution is wrong", error: data.error });
  }
}


// Function to get submission 

async function submitSolution(req, res) {
  await axios
    .post(
      process.env.SPHERE_SUBMISSION_URL +
        "?access_token=" +
        process.env.SPHERE_PROBLEMS_TOKEN,
      {
        problemId: req.body.problemId,
        source: req.body.source,
        compilerId: req.body.compilerId || 1,
      }
    )
    .then(async (response) => {
      
      // sent code to sphere then get the result

      await axios
        .get(
          process.env.SPHERE_SUBMISSIONS_URL +
            "/" +
            response.data.id +
            "?access_token=" +
            process.env.SPHERE_PROBLEMS_TOKEN
        )
        .then(async (response) => {
          await submissionMessage(response, req, res);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

module.exports = { submitSolution };
