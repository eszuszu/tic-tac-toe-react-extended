'use client'

import styles from './page.module.css'
import { useState } from 'react';

export function NewComponent() {
  return (
    <div>
      <h3>Wow</h3>
      <p>That's Crazy</p>
    </div>
  )
};

function Square({ value, onSquareClick, cellKey, isToggled }) {

  return <button
    className={`${styles.square} ${styles[cellKey]} ${isToggled ? styles.toggled : ''}`}
    onClick={onSquareClick}>{value}
  </button>
};


const initializeBoardConfig = (rows = 3, cols = 3) => {
  let cells = rows * cols;
  const rowLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  const config = new Map();
  const cellPositions = [];

  let position = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const cellKey = `${rowLabels[row]}${col}`
      config.set(cellKey, null);
      cellPositions.push(position);
      position++;
    }

  }
  return { config, cellPositions };
};


export function Board({ xIsNext, config, playerXState, playerOState, toggledSquares, onPlay }) {

  const currentPlayer = xIsNext ? "X" : "O";
  const currentPlayerState = xIsNext ? playerXState : playerOState;

  function handleClick(key) {


    if ((config.get(key) !== null) || calculateWinner(currentPlayerState)) return;



    onPlay(key);


  }

  const winner = calculateWinner(currentPlayerState);
  let status;
  if (winner) {
    status = `Winner winner chicken dinner! Congrat's player ${currentPlayer}`;
  } else {
    status = `Player ${currentPlayer}'s turn`;
  }

  return (
    <section id="game-board">
      <div className={styles.board}>
        {Array.from(config.entries()).map(([key, value]) => (
          <Square
            key={key}
            value={value}
            cellKey={key}
            onSquareClick={() => handleClick(key)}
            isToggled={toggledSquares[key]}
          />
        ))}
      </div>
      <div className={styles.status}>{status}</div>
    </section>
  )
};

function calculateWinner(playerState) {
  //for tic-tac-toe, represented in bits, the winning lines
  const winningLineCombos = [
    0b111000000, // top row
    0b000111000, //mid row
    0b000000111, //bot row
    0b100100100, //left col
    0b010010010, //mid col
    0b001001001, //right col
    0b100010001, //top-left ---> bot-right diag
    0b001010100 //bot-left ---> top-right diag
  ]

  return winningLineCombos.some(combo => (playerState & combo) === combo);
}

//bit-wise utility functions

function calculateBitMask(cells) {
  const targetBitLength = cells;
  return (1 << targetBitLength) - 1;
}

function setBit(bitMask, bitPlace) {
  return bitMask |= (1 << bitPlace)
}

function clearBit(bitMask, bitPlace) {
  return bitMask &= ~(1 << bitPlace);
}

function flipBit(bitMask, bitPlace) {
  return bitMask ^= (1 << bitPlace);
}

function bitIsSet(bitMask, bitPlace) {
  return (bitMask & (1 << bitPlace)) !== 0;
}

export function Game() {

  const [history, setHistory] = useState([{ config: initializeBoardConfig().config, toggledSquares: {} }]);

  const [playerXState, setPlayerXState] = useState(0);
  const [playerOState, setPlayerOState] = useState(0);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const { config, cellPositions = [], toggledSquares } = history[currentMove];


  //Initialize game state and board configuration history


  const currentPlayerState = xIsNext ? playerXState : playerOState;

  console.log(config);
  function handlePlay(key) {
    //Primary click handling logic

    console.log('Key: ', key, 'Config ', Array.from(config.keys()))
    const position = cellPositions[Array.from(config.keys()).indexOf(key)];

    const updatedPlayerState = setBit(currentPlayerState, position);
    const newBoardConfig = new Map(config);
    newBoardConfig.set(key, xIsNext ? "X" : "O");

    const newToggledSquares = { ...toggledSquares, [key]: true };
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { config: newBoardConfig, cellPositions, toggledSquares: newToggledSquares }
    ];
    setHistory(nextHistory);
    //add toggled class

    setCurrentMove(nextHistory.length - 1);




    //update the players state.
    xIsNext ? setPlayerXState(updatedPlayerState) : setPlayerOState(updatedPlayerState);

    //Check if the move was a winning move, if so, return.
    if (calculateWinner(updatedPlayerState)) return;

  }

  function jumpTo(nextMove) {
    //Update current move
    setCurrentMove(nextMove);


    const { toggledSquares } = history[nextMove];
    setHistory(history.map((entry, index) => {
      if (index === nextMove) {
        return { ...entry, toggledSquares };
      }
      return entry;
    }))
  }

  //Map history entries to moves and assign a list item w/button to each move
  const moves = history.map((_, move) => {
    let description;

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );

  });

  return (
    <div className="game">

      <Board
        xIsNext={xIsNext}
        config={config}
        playerXState={playerXState}
        playerOState={playerOState}
        toggledSquares={toggledSquares}
        onPlay={handlePlay}
      />
      <section className='game-info'>
        <ol>{moves}</ol>
      </section>
    </div>
  )
}