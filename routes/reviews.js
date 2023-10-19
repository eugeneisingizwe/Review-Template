const reviews = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');



//Get route to retrieve all the reviews information

reviews.get("/", (req, res) => {
    readFromFile("./db/reviews.json").then((data) => res.json(JSON.parse(data)))
});

//POST Route for a specific review 
reviews.get("/:review_id", (req, res) => {

    const reviewId = req.params.review_id;
    readFromFile("./db/reviews.json")
    .then((data) => JOSN.parse(data))
    .then((json) => {
        const result = json.filter((review) => review.review_id === reviewId);
        return result.length > 0
        ? res.json(result)
        : res.json("No review with this ID");
    })
})

//DELETE Route for specific review 

reviews.delete("/:review_id" , (req, res) => {
    const reviewId = req.params.review_id;
    readFromFile("./db/reviews.json")
        .then((data) => JOSN.parse(data))
        .then((josn) => {
            //make a new array of all reviews except the one with the ID provided in the URL
            const result = josn.filter((review) => review.review_id !== reviewId);

            //save that array to the filesystems
            writeToFile("./db/reviews.json", result)

            //Respond to the DELETE request
            res.json(`Item ${reviewId} has been deleted 🗑️`);

        });
});

//POST Route for a new front-end/back-end review

reviews.post("/", (req, res) => {
    console.log(req.body);

    const {username, review, topic } = req.body;

    if (req.body) {
        const newReview = {
            username,
            review, 
            topic,
            review_id: uuidv4(),
        };

        readAndAppend(newReview, "./db/reviews.json");
        res.josn("Review added succesfully 🚀");
    } else {
        res.errored("Error in adding review")
    }
});

module.exports = reviews;






