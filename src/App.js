
import React, {useState}  from 'react';
import './App.css';
import Board from './components/Board.js';


function App() {

  const [isXTurn, setIsXTurn] = useState(true);
  const [xScore, setXScore] = useState([]); //cells marked with X
  const [oScore, setOScore] = useState([]); //cells marked with O
  const [xWinScore, setXWinScore] = useState(0);  //score of games
  const [oWinScore, setOWinScore] = useState(0);

  

  const winCombinations = [
    ["no1", "no2", "no3"],
    ["no4", "no5", "no6"],
    ["no7", "no8", "no9"],
    ["no1", "no4", "no7"],
    ["no2", "no5", "no8"],
    ["no3", "no6", "no9"],
    ["no1", "no5", "no9"],
    ["no3", "no5", "no7"],
  ];

  let allCells = [...document.querySelectorAll('.cell')];
  

  const cellClick = (e) => {
    markBoard(e)
    keepScore(e)
    winActions();
  };

  //checks if there is a winner, if true, then: all cells inactive, winner class
  //added to winning combo cells (for animation)
  //update win score
  const winActions = () => {

    if (checkWinner(winCombinations, xScore)) {
        allCells.map(cell => cell.classList.add('inactive'));
        checkWinner(winCombinations, xScore)
              .map(cell =>{
                document.querySelector(`.${cell}`).classList.add('winner')
              })
        setXWinScore(xWinScore+1)
      }else if (checkWinner(winCombinations, oScore)) {
        allCells.map(cell => cell.classList.add('inactive'));
        checkWinner(winCombinations, oScore)
              .map(cell =>{
                document.querySelector(`.${cell}`).classList.add('winner')
              })
        setOWinScore(oWinScore+1)
      };

  };


  //loop through all winning combos and compare against player score 
  //return winning combo or undefined
  const checkWinner = (winCombinationArr, currentPlayerScore) =>{

    let winCombo;

    for(var i = 0; i < winCombinationArr.length; i++){
      if(checkCombination(winCombinationArr[i], currentPlayerScore) === 3){
        winCombo = winCombinationArr[i]
      }
      }
    return winCombo
    };

    //helper func, compares one winning combo to player score, counts matches
    //3 matches is a win
    function checkCombination(oneWinCombo, scoreArr){
      let count = 0;
      for (var i = 0; i < oneWinCombo.length; i++){
        if (scoreArr.includes(oneWinCombo[i])) {
          count += 1;
        } 
      }
      return count;
    };

  // if xturn make x visible by adding class visible to .cross class elements
  //otherwise make circle visible
  //querySelectorAll return nodelist, ... spread operator to 
  //create an array out of the nodelist
  //finally disable clicking on target cell 
  const markBoard = (e) => {
    if (isXTurn) {
      [...e.target.querySelectorAll('.cross')]
          .map(axis =>{
            axis.classList.add('visible')
          });
      setIsXTurn(false)
    }else{
      [...e.target.querySelectorAll('.circle')]
          .map(circle =>{
            circle.classList.add('visible')
          });
      setIsXTurn(true)
    }
    e.target.classList.add('inactive')
  }

  //push the cell className to score state arr
  const keepScore = (e) => {
    isXTurn ? xScore.push(e.target.classList[1]) : oScore.push(e.target.classList[1])
  };


  //remove inactive class from all cells
  //remove "visble and "winner" from all child elements of cells
  //clear scores for both players
  const resetGame = () => {
    allCells.map(cell => {
      cell.classList.remove("inactive", "winner");
      [...cell.childNodes].forEach(child => child.classList.remove("visible"));
    })
    setOScore([]);
    setXScore([]);
    setIsXTurn(true);
  };

  const resetWinScore = () => {
    setXWinScore(0);
    setOWinScore(0);
    resetGame();
  }


return(
    <div className="wrapper">
     <Board cellClick={cellClick}/>
     <div className="display">
      <div id="xScoreDisplay" className="score"><span>X</span><span>:</span><span>{xWinScore}</span></div>
      <div id="oScoreDisplay" className="score"><span>O</span><span>:</span><span>{oWinScore}</span></div>
      <button className="resetGameButton" onClick={resetGame} >NEW GAME</button><br/>
      <button className="resetScoreButton" onClick={resetWinScore} >CLEAR SCORE</button>
    </div>
    </div>
  )
};

export default App;
