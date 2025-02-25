"use client";

import React, { useState } from "react";


const PublicGoodsGame = () => {
  const [gameSettings] = useState({
    maxRounds: 10,
    multiplier: 1.5,
    initialEndowment: 10,
  });
  
  
  const [round, setRound] = useState(1);
  const [gameStatus, setGameStatus] = useState("playing");
  const [gameHistory, setGameHistory] = useState([]);
  
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", contribution: 0, total: gameSettings.initialEndowment },
    { id: 2, name: "Player 2", contribution: 0, total: gameSettings.initialEndowment },
    { id: 3, name: "Player 3", contribution: 0, total: gameSettings.initialEndowment },
    { id: 4, name: "Player 4", contribution: 0, total: gameSettings.initialEndowment },
  ]);

  const updateContribution = (playerId, amount) => {
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, contribution: amount } : player
    ));
  };

  const processRound = () => {
    const totalContribution = players.reduce((sum, p) => sum + p.contribution, 0);
    const sharedAmount = totalContribution * gameSettings.multiplier;
    const perPlayerGain = sharedAmount / players.length;
    
    setGameHistory([...gameHistory, { round, totalContribution, perPlayerGain }]);
    setPlayers(players.map(player => ({
      ...player,
      total: player.total - player.contribution + perPlayerGain,
      contribution: 0,
    })));
    
    if (round >= gameSettings.maxRounds) {
      setGameStatus("finished");
    } else {
      setRound(round + 1);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Public Goods Game</h2>
        <p className="text-lg font-bold text-gray-900">Round {round}/{gameSettings.maxRounds}</p>
        
        <div className="grid grid-cols-2 gap-6 my-6">
          {players.map(player => (
            <div key={player.id} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-bold text-gray-900">{player.name}</p>
              <p className="font-bold text-gray-900">Balance: {player.total.toFixed(2)}</p>
              <input
                type="number"
                min="0"
                max={player.total}
                value={player.contribution}
                onChange={(e) => updateContribution(player.id, parseFloat(e.target.value) || 0)}
                className="w-full p-2 mt-2 border rounded font-bold text-gray-900"
              />
            </div>
          ))}
        </div>

        <button
          onClick={processRound}
          disabled={gameStatus === "finished"}
          className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold"
        >
          End Round
        </button>

        {gameStatus === "finished" && (
          <p className="mt-6 text-xl font-bold text-red-500">Game Over!</p>
        )}
      </div>
    </div>
  );
};

export default PublicGoodsGame;

