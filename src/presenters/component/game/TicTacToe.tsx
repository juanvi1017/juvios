import { useState } from "react";

type Player = "X" | "O" | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [tied, setTied] = useState<boolean>(false);

  const checkWinner = (newBoard: Player[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isPlayerOneTurn ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      // validación si hay más turnos
      if(newBoard.includes(null)) {
        setIsPlayerOneTurn(!isPlayerOneTurn);
      } else {
        setTied(true)
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true);
    setWinner(null);
    setTied(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#4362fc] h-full">
      <h1 className="text-2xl font-bold mb-4">Triqui (Tic-Tac-Toe)</h1>
      {(winner && !tied) ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">¡Ganador: {winner}!</h2>
          <button onClick={resetGame} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full" style={{margin: '10px'}}>
            Reiniciar
          </button>
        </div>
      ) : (
        <h2 className="text-xl font-semibold mb-4">
          Turno de: {isPlayerOneTurn ? "Jugador 1 (X)" : "Jugador 2 (O)"}
        </h2>
      )}
      {tied && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">¡Empate!</h2>
          <button onClick={resetGame} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full" style={{margin: '10px'}}>
            Reiniciar
          </button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-white border border-gray-300 text-2xl font-bold flex items-center justify-center"
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
