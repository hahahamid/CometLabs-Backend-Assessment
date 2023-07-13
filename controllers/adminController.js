const Question = require("../models/Question");
const axios = require("axios");

async function addQuestion(req, res) {
  // middleware functionality implementation

  if (req.user.role == "admin") {
    // go through only if the problem data is valid

    if (!req.body.name || !req.body.description) {
      return res.status(400).send("Missing required fields");
    } else {
      await axios
        .post(
          process.env.SPHERE_PROBLEMS_URL +
            "?access_token=" +
            process.env.SPHERE_PROBLEMS_TOKEN,
          {
            name: req.body.name,
            body: req.body.description,
            masterjudgeId: 1001,
          }
        )
        .then(async (response) => {
          await Question.create({
            id: response.data.id,
          });
          return res.send(response.data);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  }

  // if the current user is a participant and not an admin
  else {
    res.send(
      "You are not an Admin! You are not authorized to create a problem!"
    );
  }
}

async function editQuestion(req, res) {

  if (req.user.role == "admin") {
    
    // get previous question data from sphere api
    await axios.get( process.env.SPHERE_PROBLEMS_URL + "/" + req.body.id + "?access_token=" + process.env.SPHERE_PROBLEMS_TOKEN)
      .then((response) => {

        // if required fields are empty overwrite with previous data
        
        if (req.body.name == null) {
          req.body.name = response.data.name;
        }
        
        if (req.body.description == null) {
          req.body.description = response.data.body;
        }
      });


    await axios.put(process.env.SPHERE_PROBLEMS_URL + "/" + req.body.id + "?access_token=" + process.env.SPHERE_PROBLEMS_TOKEN, {
          name: req.body.name,
          body: req.body.description,
        }
      )
      .then((response) => {
        return res.send(response.data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } 
    // if the current user is a participant and not an admin

  else {
    res.send("You are not an Admin! You are not authorized to edit a problem!");
  }
}

async function deleteQuestion(req, res) {
  if (req.user.role == 'admin') {

    await axios.delete(process.env.SPHERE_PROBLEMS_URL + '/' + req.body.id + '?access_token=' + process.env.SPHERE_PROBLEMS_TOKEN)
    .then(async (response) => {
        await Question.deleteOne({ id: req.body.id })
        return res.send(response.data)
    }).catch(error => {
        res.status(400).send(error)
    })  
  } 

  // if the current user is a participant and not an admin

  else {
    res.send("You are not an Admin! You are not authorized to delete a problem!")
  }
}

module.exports = { addQuestion, editQuestion, deleteQuestion };
