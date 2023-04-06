import React, { useState } from 'react';
import questions from '../../questions'


function Quiz() {

// Sound

const correctAnswer = new Audio("https://www.fesliyanstudios.com/play-mp3/3562");
const wrongAnswer = new Audio("https://www.fesliyanstudios.com/play-mp3/4031");

// Properties

  const [showFinalResults, setShowFinalResults ] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [drink, setDrink] = useState('');
  let [previousScore, setPreviousScore] = useState(0)

// Helper Functions

const optionClicked = (isCorrect) => {
if (score > previousScore){
  previousScore = score;
}

  if (isCorrect){
    setScore(score + 1);
    setDrink(drink + '🥃');
    correctAnswer.play();
  }

  if (!isCorrect){
  setDrink(drink + '❌');
  wrongAnswer.play();
  }

  if (currentQuestion + 1 < questions.length){
    setCurrentQuestion(currentQuestion + 1);
  } else {
    setShowFinalResults(true);
  }

}
// restart
const restartGame = () => {
  setPreviousScore(score);
  setScore(0);
  setCurrentQuestion(0)
  setShowFinalResults(false)
  setDrink('')
}

  return (
    <div className="Quiz">

      {/* 1. Header */}
    <h1>Alcohol Quiz 🥃</h1>
      {/* 2. Current Score & Previous */}
    <h2>Current Score: {score}</h2>
    <h2>Previous Score: {previousScore}</h2>

    { showFinalResults ? (
      /* 4. Final Results */
      /* Change Add Score button at bottom to useEffect */
      <div className='final-results'>
        <h1>Final Results</h1>
        <h2>
          {score} out of {questions.length} - ({(score / questions.length) * 100}%)
        </h2>
          <button onClick={() => restartGame()}>Restart Quiz</button>
          <br />
          <h1>
          {drink}
          </h1>
          <button>Add Score to Leader Board</button>
      </div>
      )

    : (
      /* 3. Question Card */
      <div className='question-card'>
        <h2>Question {currentQuestion + 1} out of {questions.length }</h2>
        <h3 className='question-text'>{questions[currentQuestion].text}</h3>

      <ul>
        {questions[currentQuestion].options.map((option) => {
          return (
            <li onClick={() => optionClicked(option.isCorrect)} key={option.id}>{option.text}</li>
          )
        })}
      </ul>
      </div>
    )}
    </div>
  );
}

export default Quiz;