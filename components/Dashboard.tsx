
import React from 'react';
import { User, Quest } from '../types';
import { DAILY_QUESTS, ICONS } from '../constants';

interface DashboardProps {
  user: User;
  onStartLesson: (lessonId: string) => void;
}

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
        <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);


const QuestItem: React.FC<{ quest: Quest }> = ({ quest }) => (
    <div className="flex items-center p-4 bg-surface/70 rounded-lg mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 text-primary">
            {ICONS.GEM}
        </div>
        <div className="flex-1">
            <p className="font-semibold text-text-primary">{quest.title}</p>
            <p className="text-sm text-text-secondary">{quest.description}</p>
            <ProgressBar progress={(quest.progress / quest.goal) * 100} />
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user, onStartLesson }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-text-primary">Welcome back, {user.name.split(' ')[0]}!</h1>
      <p className="text-text-secondary mb-8">Let's continue your Python journey.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Continue Learning Card */}
          <div className="bg-surface p-6 rounded-lg shadow-lg bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/800/200?blur=5')"}}>
            <div className="bg-surface/80 p-6 rounded-lg -m-2">
                <p className="text-sm font-semibold text-primary">CONTINUE</p>
                <h2 className="text-2xl font-bold mt-1 text-text-primary">Introduction to Control Flow</h2>
                <p className="text-text-secondary mt-2 mb-4">Learn how to make decisions in your code with if, elif, and else statements.</p>
                <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <button 
                  onClick={() => onStartLesson('control-flow')}
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-lg transition-colors">
                  Start Lesson
                </button>
            </div>
          </div>
          
          {/* Daily Quests */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Daily Quests</h3>
            {DAILY_QUESTS.map(quest => <QuestItem key={quest.id} quest={quest} />)}
          </div>
        </div>
        
        {/* Streak and Quick Practice */}
        <div className="space-y-6">
          {/* Current Streak */}
          <div className="bg-surface p-6 rounded-lg text-center">
            <p className="text-text-secondary font-semibold">Current Streak</p>
            <p className="text-6xl font-extrabold text-primary my-2">{user.streak}</p>
            <p className="text-text-secondary">Days</p>
            <p className="text-sm text-text-secondary mt-2">Keep it up! You're on a roll.</p>
          </div>
          
          {/* Quick Practice */}
          <div className="bg-surface p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-text-primary">Quick Practice</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-surface/70 rounded-lg">
                <div>
                  <p className="font-semibold text-text-primary">Variables & Data Types</p>
                  <p className="text-sm text-text-secondary">5 min practice</p>
                </div>
                <button className="bg-primary/20 hover:bg-primary/40 text-primary p-2 rounded-full">{ICONS.PLAY}</button>
              </div>
              <div className="flex justify-between items-center p-3 bg-surface/70 rounded-lg">
                <div>
                  <p className="font-semibold text-text-primary">Lists & Dictionaries</p>
                  <p className="text-sm text-text-secondary">10 min practice</p>
                </div>
                <button className="bg-primary/20 hover:bg-primary/40 text-primary p-2 rounded-full">{ICONS.PLAY}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
