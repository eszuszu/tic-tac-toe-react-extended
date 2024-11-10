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

function Square({ value, onSquareClick, cellKey }) {

  return <button className={`${styles.square} ${styles[cellKey]}`} onClick={onSquareClick}>{value}</button>
};


const initializeBoardConfig = (rows = 3, cols = 3) => {
  let cells = rows * cols;
  const rowLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  const config = new Map();
  for (let row = 0; row < rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const cellKey = `${rowLabels[row]}${col}`
      config.set(cellKey, null);
    }
    
  }
  return config;
};

function calculateBitMask (cells) {
  const targetBitLength = cells;
  return (1 << targetBitLength) -1;
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

export function Board() {
  const [boardConfig, setBoardConfig] = useState(initializeBoardConfig());
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(key) {
    if (boardConfig.get(key) !== null) return;
    const newConfig = new Map(boardConfig);
    xIsNext ? newConfig.set(key, "X") : newConfig.set(key, "O");

    setBoardConfig(newConfig);
    setXIsNext(!xIsNext);
  }

  return (
    <div className={styles.board}>

      {Array.from(boardConfig.entries()).map(([key, value]) => (
        <Square key={key} value={value} cellKey={key} onSquareClick={() => handleClick(key)} />
      ))}

    </div>
  )
};