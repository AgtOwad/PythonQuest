
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const ProgressBar: React.FC<{ progress: number; label: string }> = ({ progress, label }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-text-primary">{label}</span>
      <span className="text-sm font-medium text-text-primary">{progress}%</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-2.5">
      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);


const SkillCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-surface/70 p-4 rounded-lg mb-4">
        <details>
            <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                {title}
                <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </summary>
            <div className="mt-4 space-y-4">
                {children}
            </div>
        </details>
    </div>
);


const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-6 mb-8">
        <img className="w-24 h-24 rounded-full border-4 border-primary" src={user.avatarUrl} alt={user.name} />
        <div>
          <h1 className="text-3xl font-bold">@pythonista23</h1>
          <p className="text-text-secondary">Level {user.level}</p>
          <p className="text-text-secondary">{user.xp} XP</p>
        </div>
        <button className="ml-auto bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg">Edit Profile</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Skill Mastery</h2>
            <div className="bg-surface p-6 rounded-lg">
                <SkillCategory title="Basics">
                    <ProgressBar label="Syntax Basics" progress={95} />
                    <ProgressBar label="Data Types" progress={88} />
                </SkillCategory>
                 <SkillCategory title="Intermediate">
                    <ProgressBar label="Control Flow" progress={75} />
                    <ProgressBar label="Functions" progress={82} />
                </SkillCategory>
            </div>
        </div>
        <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-surface p-6 rounded-lg space-y-4">
                <p className="text-text-secondary text-sm">Completed: 'Intro to Dictionaries'</p>
                <p className="text-text-secondary text-sm">Solved: 'FizzBuzz Challenge'</p>
                <p className="text-text-secondary text-sm">Earned: 'Syntax Star' Badge</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
