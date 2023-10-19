const fb = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

//Get route to retrieve all feedback informotion

fb.get("./" , (req, res) => {
    readFromFile("./db/feedback.josn").then((data) => res.json(JSON.parse(data)))
});

//POST Route for submitting feedback

fb.post("/", (req, res) => {
    //Destructuring assigment for the items in req.body

    const {email, feedbackType, feedback} = req.body;

    //if all the required properties are present

    if(email && feedbackType && feedback) {
        //variable for the object we will save 

        const newFeedback = {
            email,
            feedbackType,
            feedback,
            feedback_id: uuidv4(),
        };

        readAndAppend(newFeedback, "./db/feedback.josn");

        const response = {
            status: "sucess",
            boby: newFeedback,
        };

        res.json(response);
    } else {
        res.json("error in posting feedback");
    }
})

module.exports = fb;