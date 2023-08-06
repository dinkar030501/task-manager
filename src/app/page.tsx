"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Square from "./components/square";

interface BoardProps {
  xIsNext: boolean;
  squares: any;
  onPlay: (square: any) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (checkWinner(squares)) {
      return;
    }

    if (Boolean(squares[i])) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "O" : "X";
    onPlay(nextSquares);
  }

  const winner = checkWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const squareList = squares.map((squareValue: any, i: number) => {
    return (
      <Square
        key={i}
        value={squareValue}
        squareIsClicked={() => handleClick(i)}
      />
    );
  });

  return (
    <main className={styles.main}>
      <div
        className={status.includes("Winner") ? styles.winner : styles.status}
      >
        {status}
      </div>
      <div className={styles.board}>{squareList}</div>
    </main>
  );
}

function checkWinner(arr: any) {
  let winner: any = null;
  arr.forEach((square: string, i: number) => {
    //horizontal
    if (i === 0 || i === 3 || (i === 6 && !Boolean(winner))) {
      if (arr[i + 1] === square && arr[i + 2] === square) {
        winner = square;
      }
    }
    //verticle
    if ((i === 0 || i === 1 || i === 2) && !Boolean(winner)) {
      if (arr[i + 3] === square && arr[i + 6] === square) {
        winner = square;
      }
    }
    //diagonals
    if (i === 0 && !Boolean(winner)) {
      if (arr[i + 4] === square && arr[i + 8] === square) {
        winner = square;
      }
    }
    if (i === 2 && !Boolean(winner)) {
      if (arr[i + 2] === square && arr[i + 4] === square) {
        winner = square;
      }
    }
  });
  return winner;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [movesOrder, setMovesOrder] = useState("A");

  const handlePlay = (arr: any) => {
    const nextHistory = [...history.slice(0, currentMove + 1), arr];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTO = (moveNumber: number) => {
    setCurrentMove(moveNumber);
  };

  const changeMovesDisplayOrder = () => {
    const order = movesOrder === "A" ? "D" : "A";
    setMovesOrder(order);
  };

  const moves = history.map((board: any, move: number) => {
    let description;
    const moveId = movesOrder === "A" ? move : history.length - 1 - move;
    if (moveId > 0) {
      description = `Go to move #${moveId}`;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={moveId}>
        <button onClick={() => jumpTO(moveId)} className={styles.move}>
          {description}
        </button>
      </li>
    );
  });
  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className={styles.gameInfo}>
        <div className={styles.orderContainer}>
          Order of the list:
          <button onClick={changeMovesDisplayOrder}>
            {movesOrder === "A" ? "Ascending" : "Descending"}
          </button>
        </div>
        <ol className={styles.moves}>{moves}</ol>
      </div>
    </div>
  );
}
