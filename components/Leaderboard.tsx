import React from 'react';
import { LEADERBOARD_DATA } from '../constants';
import { panelClass, cardClass, sectionHeadingClass, sectionSubtitleClass, pillMutedClass } from './ui/primitives';

const Leaderboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className={`${panelClass} p-6 sm:p-8`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`${sectionHeadingClass} text-3xl`}>Leaderboard</h1>
            <p className={sectionSubtitleClass}>Track where you stand among PythonQuest adventurers this week.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
            <span className={pillMutedClass}>Weekly</span>
            <span className={pillMutedClass}>Global</span>
            <span className={pillMutedClass}>Friends</span>
          </div>
        </div>
      </header>

      <section className={`${panelClass} p-0`}> 
        <div className="overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-surface-border/70 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            <span>Rank</span>
            <span>Player</span>
            <span className="text-right">Weekly XP</span>
          </div>
          <ul className="divide-y divide-surface-border/60">
            {LEADERBOARD_DATA.map((player) => (
              <li
                key={player.rank}
                className={`grid grid-cols-[80px_1fr_140px] items-center gap-4 px-6 py-5 text-sm transition hover:bg-surface-card/40 ${
                  player.name === 'You' ? 'bg-primary/10' : ''
                }`}
              >
                <span className="text-lg font-semibold text-ink-muted">#{player.rank}</span>
                <div className="flex items-center gap-3">
                  <img src={player.avatar} alt={player.name} className="h-10 w-10 rounded-2xl border border-surface-border/50 object-cover" />
                  <div>
                    <p className="font-semibold text-ink-primary">{player.name}</p>
                    {player.name === 'You' && <p className="text-xs text-primary">Keep the streak alive!</p>}
                  </div>
                </div>
                <span className="text-right font-semibold text-ink-primary">{player.xp.toLocaleString()} XP</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${panelClass} p-6 sm:p-8`}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className={`${cardClass} space-y-3 p-5`}>
            <h2 className={sectionHeadingClass}>Progress Tips</h2>
            <p className="text-sm text-ink-secondary">
              Finish your in-progress lessons and replay quizzes for perfect scores to climb faster.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-xs text-ink-muted">
              <li>Complete two practice boosters per day.</li>
              <li>Share streak updates with friends for motivation.</li>
              <li>Convert gems into XP boosters in the store.</li>
            </ul>
          </div>
          <div className={`${cardClass} space-y-3 p-5`}>
            <h2 className={sectionHeadingClass}>Rewards Preview</h2>
            <p className="text-sm text-ink-secondary">Top 50 players earn exclusive avatars and gem bundles.</p>
            <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
              <span className={pillMutedClass}>Limited avatar</span>
              <span className={pillMutedClass}>+500 Gems</span>
              <span className={pillMutedClass}>XP multiplier</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
