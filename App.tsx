
import React, { useState, useCallback } from 'react';
import { View, User, Lesson } from './types';
import { MOCK_USER, LESSON_CONTENT } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LearningPath from './components/LearningPath';
import LessonView from './components/LessonView';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const handleNavigate = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const handleStartLesson = useCallback((lessonId: string) => {
    const lesson = LESSON_CONTENT[lessonId];
    if(lesson){
        setActiveLesson(lesson);
        setActiveView('lesson');
    }
  }, []);
  
  const handleLessonComplete = useCallback((xpGained: number, gemsGained: number) => {
    setUser(prevUser => ({
        ...prevUser,
        xp: prevUser.xp + xpGained,
        gems: prevUser.gems + gemsGained,
    }));
    setActiveView('learning-path');
    setActiveLesson(null);
    // Here you would also update the status of the completed node
  }, []);


  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={user} onStartLesson={handleStartLesson} />;
      case 'learning-path':
        return <LearningPath onNodeSelect={handleStartLesson} />;
      case 'lesson':
        return activeLesson ? <LessonView lesson={activeLesson} onComplete={handleLessonComplete} /> : <LearningPath onNodeSelect={handleStartLesson} />;
      case 'profile':
        return <Profile user={user} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard user={user} onStartLesson={handleStartLesson} />;
    }
  };

  return (
    <div className="flex h-screen font-sans bg-background">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} user={user} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
