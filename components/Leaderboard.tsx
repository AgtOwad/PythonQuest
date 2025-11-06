
import React from 'react';
import { LEADERBOARD_DATA } from '../constants';

const Leaderboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <div className="flex space-x-1 p-1 bg-surface rounded-lg">
            <button className="px-4 py-1.5 rounded-md bg-primary text-white text-sm font-semibold">Weekly</button>
            <button className="px-4 py-1.5 rounded-md text-text-secondary hover:bg-surface/50 text-sm font-semibold">Global</button>
            <button className="px-4 py-1.5 rounded-md text-text-secondary hover:bg-surface/50 text-sm font-semibold">Friends</button>
        </div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-lg">
        <div className="px-6 py-3 grid grid-cols-3 text-sm font-semibold text-text-secondary border-b border-border-color">
          <div>Rank</div>
          <div>Player</div>
          <div className="text-right">Weekly XP</div>
        </div>
        <ul>
          {LEADERBOARD_DATA.map((player, index) => (
            <li key={index} className={`grid grid-cols-3 items-center px-6 py-4 transition-colors ${player.name === 'You' ? 'bg-primary/20' : 'hover:bg-surface/50'}`}>
              <div className="font-bold text-lg">{player.rank}</div>
              <div className="flex items-center">
                <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full mr-4" />
                <span className="font-semibold">{player.name}</span>
              </div>
              <div className="text-right font-semibold text-text-primary">{player.xp.toLocaleString()} XP</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
