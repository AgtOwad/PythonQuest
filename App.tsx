
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
import Onboarding from './components/Onboarding';
import AuthExperience from './components/AuthExperience';
import { NotificationsScreen, OfflineScreen, ErrorScreen, HintScreen, LoadingScreen, EmptyStateScreen } from './components/SystemStates';
import { QuizScreen, ResultsScreen } from './components/Assessments';
import ProjectShowcase from './components/ProjectShowcase';
import Store from './components/Store';
import AchievementShare from './components/AchievementShare';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const handleNavigate = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const handleStartLesson = useCallback((lessonId: string) => {
    const lesson = LESSON_CONTENT[lessonId];
    if (lesson) {
      setActiveLesson(lesson);
      setActiveView('lesson');
    }
  }, []);
  
  const handleLessonComplete = useCallback((xpGained: number, gemsGained: number) => {
    setUser((prevUser) => ({
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
      case 'store':
        return <Store />;
      case 'onboarding':
        return <Onboarding onNavigate={handleNavigate} />;
      case 'login':
        return <AuthExperience variant="login" onNavigate={handleNavigate} />;
      case 'signup':
        return <AuthExperience variant="signup" onNavigate={handleNavigate} />;
      case 'reset-password':
        return <AuthExperience variant="reset-password" onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'offline':
        return <OfflineScreen />;
      case 'error':
        return <ErrorScreen />;
      case 'hint':
        return <HintScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'results':
        return <ResultsScreen />;
      case 'project':
        return <ProjectShowcase />;
      case 'achievement':
        return <AchievementShare />;
      case 'loading':
        return <LoadingScreen />;
      case 'empty-state':
        return <EmptyStateScreen />;
      default:
        return <Dashboard user={user} onStartLesson={handleStartLesson} />;
    }
  };

  return (
    <div className="min-h-screen bg-background bg-app-gradient text-ink-primary">
      <div className="flex min-h-screen">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} user={user} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 md:px-12 md:py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
