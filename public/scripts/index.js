const tipForm = document.getElementById("tip-form");
const tipsContainer = document.getElementById("tip-container");
const fbBtn = document.getElementById("feedback-btn");

fbBtn.addEventListener("click" , (e) => {
    e.preventDefault;

    window.location.href = "./reviews";

});

const createCard = (review) => {
    //create card 

    const cardEl = document.createElement("div");
    cardEl.classList.add("card", "mb-3", "m-3");
    cardEl.setAttribute("key", review.tip_id);

    //create card header 

    const cardHeaderEl = document.createElement("h4");
    cardHeaderEl.classList.add(
        "card-header",
        "bg-primary",
        "text-light",
        "p-2",
        "m-0"
    );

    cardHeaderEl.innerHTML = `${review.username} </br>`;

    //create card boby
    const cardBodyEl = document.createElement("div");
    cardBodyEl.classList.add("card-body", "big-light", "p-2");
    cardBodyEl.innerHTML = `<p>${review.review}</p>`;

    //Append the header and body to the card element
    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);

    //Append the card element to the tips contianers 

    tipsContainer.appendChild(cardEl);

};

//get a list of existing reviews from the seriver 

const postReivew = (review) => 
fetch("/api/reviews" , {
    method: "POST",
    headers: {
        "content-Type" : "application/js"
    },

    body: JSON.stringify(review),
}).then((reponse) => reponse.json())
  .then((data) => {
    alert(data);
    createCard(review)
  })
    .catch((error) => {
        console.error("error" , error);
    });


//When the page loads get all the reviews 

getReviews().then((data) => data.forEach((review) => createCard(review)));

//fucntion to validate the reviews that were submitted 

const validateReview = (newReview) => {
    const {username, topic, review} = newReview;

    //Object to hold our error messages until we are ready to return

    const errorState = {
        username: "",
        review: "",
        topic:"",
    };

    //bool value if the username is valid 

    const utest = username.length >= 4;
    if(!utest) {
        errorState.username = "Invalid username!";
    }

    //Bool value to see if the reviews being added is at least 15 characters long 

    const reviewContentCheck = review.length > 15;
    if (!reviewContentCheck) {
        errorState.review = "The review muust be at least 15 characters";
    }

    //Bool value to see if the topic is either front-end or Back-end 

    const topicCheck = topic.includes("back-end" || "front-end");
    if(!topicCheck) {
        errorState.topic ="Review is not relevant to front-end or back-end";
    }

    const result = {
        isValid: !!(utest && reviewContentCheck && topicCheck),
        errors: errorState,
    };

    //return object with a isValid boolean and an errors object for nay errors that may exist 
    return result;
}

// Helper function to deal with errors that exist in the result

const showErrors = (errorObj) => {
    const errors = Object.values(errorObj);
    errors.forEach((error) => {
      if (error.length > 0) {
        alert(error);
      }
    });
  };

  // Helper function to send a POST request to the diagnoistics route

  const submitDiagnistics =  (submissionObj) => {
    fetch("/api/diagnistics/josn", {
        method: "POST",
        headers: {
            "content-type" : "application/json",
        },

        body: JSON.stringify(submissionObj),
    })
    .then((response) => response.json())
    .then(() => showErrors(submissionObj.errors))
    .catch((error) => {
        console.error("Error:", error);
    });
  };

  //function to handle when a user submits the feedback form

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("From submit invked");

    //get value of the review and save to a varible 

    const reviewContent = document.getElementById("tipText").value;
    
    //get the value of the isername and save it to a variable 
    const tipUsername = document.getElementById("tipUsername").value;

    //create an object with the review and username 

    const newReview ={
        username: tipUsername,
        topic: "back-end",
        review: reviewContent

    };

    // Run the review object through our validator function

    const submission = validateReview(newReview);

    //if the subussuib is valud, post the review. Otherwise, handle the errors.

    return submission.isValid ? postReivew(newReview) : submitDiagnistics(submission);
  };

  //Listen for when the form is submittd 

  tipForm.addEventListener("submit" ,handleFormSubmit);



