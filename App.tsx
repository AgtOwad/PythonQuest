import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { AuthVariant, Lesson, OnboardingPreferences, User, View } from './types';
import { LESSON_CONTENT } from './constants';
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
import {
  fetchSession,
  login,
  recordLessonProgress,
  requestPasswordReset,
  signup,
  submitOnboardingPreferences,
} from './services/apiClient';

const SESSION_STORAGE_KEY = 'pythonquest.session';

type ExperienceStage = 'loading' | 'onboarding' | 'auth' | 'app';

const App: React.FC = () => {
  const [experienceStage, setExperienceStage] = useState<ExperienceStage>('loading');
  const [authVariant, setAuthVariant] = useState<AuthVariant>('signup');
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [flowError, setFlowError] = useState<string | null>(null);
  const [flowMessage, setFlowMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!storedSession) {
      setExperienceStage('onboarding');
      return;
    }

    try {
      const parsed = JSON.parse(storedSession) as { token?: string };
      if (!parsed.token) {
        throw new Error('Missing token');
      }

      fetchSession(parsed.token)
        .then((session) => {
          setUser(session.user);
          setSessionToken(session.token);
          setExperienceStage('app');
        })
        .catch(() => {
          localStorage.removeItem(SESSION_STORAGE_KEY);
          setExperienceStage('onboarding');
        });
    } catch (error) {
      console.error('Failed to hydrate session', error);
      localStorage.removeItem(SESSION_STORAGE_KEY);
      setExperienceStage('onboarding');
    }
  }, []);

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

  const handleLessonComplete = useCallback(
    (xpGained: number, gemsGained: number) => {
      const lessonId = activeLesson?.id;
      const userId = user?.id;

      setUser((prevUser) => {
        if (!prevUser) {
          return prevUser;
        }
        return {
          ...prevUser,
          xp: prevUser.xp + xpGained,
          gems: prevUser.gems + gemsGained,
        };
      });

      if (sessionToken && lessonId && userId) {
        recordLessonProgress(sessionToken, {
          user_id: userId,
          lesson_id: lessonId,
          status: 'completed',
          xp_earned: xpGained,
          gems_earned: gemsGained,
        }).catch((error) => {
          console.error('Failed to sync lesson progress', error);
        });
      }

      setActiveView('learning-path');
      setActiveLesson(null);
    },
    [activeLesson, sessionToken, user],
  );

  const handleExperienceRedirect = useCallback((variant: AuthVariant) => {
    setAuthVariant(variant);
    setFlowError(null);
    setFlowMessage(null);
    setExperienceStage('auth');
  }, []);

  const handleOnboardingComplete = useCallback(
    async (preferences: OnboardingPreferences) => {
      setIsProcessing(true);
      setFlowError(null);
      try {
        await submitOnboardingPreferences(preferences);
        setFlowMessage('Preferences saved! Create your account to continue.');
        setAuthVariant('signup');
        setExperienceStage('auth');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to save your onboarding preferences.';
        setFlowError(message);
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  const handleAuthVariantChange = useCallback((variant: AuthVariant) => {
    setAuthVariant(variant);
    setFlowError(null);
    setFlowMessage(null);
  }, []);

  const handleBackToOnboarding = useCallback(() => {
    setFlowError(null);
    setFlowMessage(null);
    setExperienceStage('onboarding');
  }, []);

  const handleAuthSubmit = useCallback(
    async (variant: AuthVariant, payload: Record<string, string>) => {
      setIsProcessing(true);
      setFlowError(null);
      setFlowMessage(null);
      try {
        if (variant === 'reset-password') {
          if (!payload.email) {
            setFlowError('Enter your email address to request a reset link.');
            return;
          }

          await requestPasswordReset(payload.email);
          setFlowMessage('Password reset instructions are on their way to your inbox.');
          setAuthVariant('login');
          return;
        }

        const session =
          variant === 'login'
            ? await login({ email: payload.email, password: payload.password })
            : await signup({
                email: payload.email,
                password: payload.password,
                name: payload.name ?? '',
              });

        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ token: session.token }));
        setSessionToken(session.token);
        setUser(session.user);
        setActiveView('dashboard');
        setActiveLesson(null);
        setExperienceStage('app');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Authentication failed. Please try again.';
        setFlowError(message);
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setSessionToken(null);
    setUser(null);
    setActiveLesson(null);
    setActiveView('dashboard');
    setFlowError(null);
    setFlowMessage('You are now signed out. Come back soon!');
    setExperienceStage('auth');
    setAuthVariant('login');
  }, []);

  const renderContent = useCallback(() => {
    if (!user) {
      return null;
    }

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
  }, [activeLesson, activeView, handleLessonComplete, handleStartLesson, user]);

  const experienceShellClass = useMemo(
    () => 'min-h-screen bg-background bg-app-gradient text-ink-primary',
    [],
  );

  if (experienceStage === 'loading') {
    return (
      <div className={experienceShellClass}>
        <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4 py-10 sm:px-8">
          <LoadingScreen />
        </main>
      </div>
    );
  }

  if (experienceStage === 'onboarding') {
    return (
      <div className={experienceShellClass}>
        <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-10 sm:px-8">
          <Onboarding
            onOpenAuth={handleExperienceRedirect}
            onComplete={handleOnboardingComplete}
            isSubmitting={isProcessing}
            message={flowMessage}
            error={flowError}
          />
        </main>
      </div>
    );
  }

  if (experienceStage === 'auth') {
    return (
      <div className={experienceShellClass}>
        <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-10 sm:px-8">
          <AuthExperience
            variant={authVariant}
            onVariantChange={handleAuthVariantChange}
            onSubmit={handleAuthSubmit}
            onBackToOnboarding={handleBackToOnboarding}
            isProcessing={isProcessing}
            message={flowMessage}
            error={flowError}
          />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={experienceShellClass}>
        <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4 py-10 sm:px-8">
          <LoadingScreen />
        </main>
      </div>
    );
  }

  return (
    <div className={experienceShellClass}>
      <div className="flex min-h-screen">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} onLogout={handleLogout} user={user} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 md:px-12 md:py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default App;
