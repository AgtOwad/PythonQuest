
import React from 'react';
import { View, User } from '../types';
import { ICONS } from '../constants';

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  user: User;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <li className="mb-1">
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-primary/20 text-primary font-semibold'
          : 'text-text-secondary hover:bg-surface hover:text-text-primary'
      }`}
    >
      <div className="w-6 h-6 mr-3">{icon}</div>
      <span>{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, user }) => {
  return (
    <aside className="w-64 bg-surface/50 border-r border-border-color flex flex-col p-4">
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 mr-3">{ICONS.PYTHON}</div>
        <h1 className="text-xl font-bold text-text-primary">PythonQuest</h1>
      </div>
      
      <div className="flex items-center mb-8 p-2">
        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mr-3 border-2 border-primary" />
        <div>
          <p className="font-semibold text-text-primary">{user.name}</p>
          <p className="text-sm text-text-secondary">Level {user.level}</p>
        </div>
      </div>

      <nav className="flex-1">
        <ul>
          <NavItem icon={ICONS.DASHBOARD} label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => onNavigate('dashboard')} />
          <NavItem icon={ICONS.LEARNING_PATH} label="Learning Path" isActive={activeView === 'learning-path'} onClick={() => onNavigate('learning-path')} />
          <NavItem icon={ICONS.PROFILE} label="Profile" isActive={activeView === 'profile'} onClick={() => onNavigate('profile')} />
          <NavItem icon={ICONS.LEADERBOARD} label="Leaderboard" isActive={activeView === 'leaderboard'} onClick={() => onNavigate('leaderboard')} />
        </ul>
      </nav>

      <div>
        <ul>
          <NavItem icon={ICONS.SETTINGS} label="Settings" isActive={activeView === 'settings'} onClick={() => onNavigate('settings')} />
          <NavItem icon={ICONS.LOGOUT} label="Log Out" isActive={false} onClick={() => alert('Logged out!')} />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
