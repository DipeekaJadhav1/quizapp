let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 10;
let countdown;



const quizArray = [
    
    {
        id: "1",
        question: "What does HTML stands for?",
        options: ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "High Tech Markup Language", "Hyperlink and Text Markup Language"],
        correct: "Hyper Text Markup Language",
    },
    {
        id: "2",
        question: "Which programming language is commonly used for adding interactivity to websites?",
        options: ["CSS", "HTML", "JavaScript", "PHP"],
        correct: "JavaScript",
    },
    {
        id: "3",
        question: "What is the purpose of CSS in web development??",
        options: ["Creating web servers", "Defining the structure of a webpage", "Adding interactivity to web pages", " Styling and formatting web content"],
        correct: "Styling and formatting web content",
    },
    {
        id: "4",
        question: "Which of the following is not a commonly used web development framework ?",
        options: ["React", "Angular", " Django", " Docker"],
        correct: " Docker",
    },
    {
        id: "5",
        question: " What is the primary function of a web server in web development??",
        options: [" Managing databases", " Running client-side code", " Serving web pages to users", "Creating web designs"],
        correct: "Serving web pages to users",
    }, {
        id: "6",
        question: "Which database language is commonly used in web development for managing data?",
        options: ["Java", "HTML", "SQL", "Python"],
        correct: "SQLS",
    },
    {
        id: "7",
        question: "What is the purpose of responsive web design?",
        options: ["Making websites load faster", " Ensuring websites work only on mobile devices", " Creating websites that adapt to different screen sizes", "Adding security features to websites"],
        correct: "Creating websites that adapt to different screen sizes",
    },
    {
        id: "8",
        question: "Which is not an Internet protocol?",
        options: ["HTTP", "FTP", "STP", "IP"],
        correct: "STP",
    },
    {
        id: "9",
        question: "Which of the following is not a valid domain name?",
        options: ["www.yahoo.com", "www.yahoo.co.uk", "www.com.yahoo", "www.yahoo.co.in"],
        correct: "www.com.yahoo",
    },
    {
        id: "10",
        question: "Which HTML tag is used for creating an ordered list?",
        options: ["ol", "ul", "li", "dd"],
        correct: "ol",
    },
    
   
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
      
        questionCount += 1;
        
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
   
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
