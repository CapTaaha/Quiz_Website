let questions = [
    new Question("Who is the current Prime Minister of India?", [ "Indira Gandhi", "Narendra Modi", "Devegowda", "Manmohan Singh"], "Narendra Modi"),
    new Question("JavaScript Supports:", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Who is the captain of Indian Cricket team?", ["Virat Kohli", "Rohit Sharma", "K.L. Rahul", "M.S. Dhoni"], "Rohit Sharma"),
    new Question("Who is best football player on Earth?", ["Cristiano Ronaldo", "Lionel Messi", "Neymar JR", "Harry Maguire :)"], "Lionel Messi"),
    new Question("What is the National Animal of India?", ["Lion", "Tiger", "Elephant", "Dog"], "Tiger"),
    new Question("Who plays Tony Stark a.k.a. Iron Man in MCU?", ["Chris Hemsworth", "Paul Rudd", "Chris Evans", "Robert Downey JR"], "Robert Downey JR"),
    new Question("Which is the best FPS shooting game?", ["Call of Duty", "Valorant", "Apex Legends", "Counter Strike"], "Apex Legends"),
    new Question("What does JSON stand for?", ["Java Simple Object Notation", "JavaScript Object Notation", "Java Semi Object Notation", "None of the above"], "JavaScript Object Notation")
];  

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.index = 0;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.index];
}

Quiz.prototype.checkForCorrectAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.index++;
}

Quiz.prototype.isEnded = function(){
    return this.index === this.questions.length;
}

function Question(questionText, choices, answer){
    this.text = questionText;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice){
    return this.answer === choice;
}

function loadQuestions(){
    if(quiz.isEnded()){
        showFinalScores();
    }
    else{
        let element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;
        let answers = quiz.getQuestionByIndex().choices;

        for( let i=0; i< answers.length; i++){
            let eachChoiceElement = document.getElementById("choice"+i);
            eachChoiceElement.innerHTML = answers[i];

            let eachButtonElement = document.getElementById("btn"+i);
            eachButtonElement.onclick = function(){
                quiz.checkForCorrectAnswer(answers[i]);
                loadQuestions();
            };
        }
        showProgress();
    }
}

let quiz = new Quiz(questions);
loadQuestions();

function showFinalScores(){
    let completHTML = 
    `<h1> Result </h1>
     <h2 id = 'score'> Your Scores :  ${quiz.score}. </h2>
     <h3> Percentage : ${quiz.score/questions.length*100}% </h3>
    `;
    let quizCanvs = document.getElementById("progress");
    quizCanvs.innerHTML = completHTML;
}

function showProgress(){
    let qNo = quiz.index + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question" + qNo + " of " + quiz.questions.length;
}