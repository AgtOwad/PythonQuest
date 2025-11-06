import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { ICONS } from '../constants';
import { getHintForCode, explainCodeError } from '../services/geminiService';
import {
  panelClass,
  cardClass,
  sectionHeadingClass,
  sectionSubtitleClass,
  labelMutedClass,
  primaryButtonClass,
  outlineButtonClass,
  ghostButtonClass,
  pillMutedClass,
} from './ui/primitives';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (xp: number, gems: number) => void;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete }) => {
  const [code, setCode] = useState(lesson.starterCode);
  const [output, setOutput] = useState<string>('Run code to see output.');
  const [activeTab, setActiveTab] = useState<'output' | 'tests'>('output');
  const [testResults, setTestResults] = useState<{ description: string; passed: boolean; error?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiHelp, setAiHelp] = useState<string | null>(null);

  useEffect(() => {
    setCode(lesson.starterCode);
    setOutput('Run code to see output.');
    setTestResults([]);
    setActiveTab('output');
    setAiHelp(null);
  }, [lesson]);

  const handleRunCode = () => {
    setOutput('Running code...');
    try {
      const capturedOutput: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedOutput.push(args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' '));
      };

      new Function(code)();

      console.log = originalConsoleLog;
      setOutput(capturedOutput.join('\n') || 'Code ran successfully with no output.');
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setActiveTab('tests');

    setTimeout(() => {
      const results = lesson.tests.map((test) => {
        try {
          new Function(`${code}\n${test.code}`)();
          return { description: test.description, passed: true };
        } catch (e: any) {
          return { description: test.description, passed: false, error: e.message };
        }
      });
      setTestResults(results);
      setIsLoading(false);
      if (results.every((r) => r.passed)) {
        onComplete(120, 15);
      }
    }, 900);
  };

  const handleGetHint = async () => {
    setIsLoading(true);
    setAiHelp('Getting a hint from your AI tutor...');
    const hint = await getHintForCode(code, lesson.description);
    setAiHelp(hint);
    setIsLoading(false);
    setActiveTab('output');
  };

  const handleExplainError = async (error: string) => {
    setIsLoading(true);
    setAiHelp('Asking AI tutor to explain this error...');
    const explanation = await explainCodeError(code, error);
    setAiHelp(explanation);
    setIsLoading(false);
    setActiveTab('output');
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <header className={`${panelClass} p-6 sm:p-8`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className={labelMutedClass}>Lesson</p>
            <h1 className={`${sectionHeadingClass} text-3xl`}>{lesson.title}</h1>
            <p className={sectionSubtitleClass}>{lesson.description}</p>
          </div>
          <div className="flex flex-col gap-3 text-xs text-ink-muted">
            <span className={pillMutedClass}>
              <span className="h-2 w-2 rounded-full bg-primary" />
              Reward: +120 XP
            </span>
            <span className={pillMutedClass}>
              <span className="h-2 w-2 rounded-full bg-gem" />
              +15 Gems
            </span>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={`${panelClass} flex min-h-[26rem] flex-col p-0`}> 
          <div className="flex items-center justify-between border-b border-surface-border/70 px-6 py-4">
            <p className="text-sm font-semibold text-ink-primary">Code Editor</p>
            <button className={ghostButtonClass} onClick={handleGetHint} disabled={isLoading}>
              <span className="text-primary">{ICONS.HINT}</span>
              <span>{isLoading ? 'Working...' : 'Get hint'}</span>
            </button>
          </div>
          <textarea
            className="editor-mono flex-1 resize-none bg-transparent px-6 py-5 text-sm text-ink-primary focus:outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div className={`${panelClass} flex min-h-[26rem] flex-col p-0`}> 
          <div className="flex items-center gap-2 border-b border-surface-border/70 px-6 py-4">
            <button
              onClick={() => setActiveTab('output')}
              data-active={activeTab === 'output'}
              className={`${outlineButtonClass} border-transparent data-[active=true]:border-primary data-[active=true]:text-primary`}
            >
              Output
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              data-active={activeTab === 'tests'}
              className={`${outlineButtonClass} border-transparent data-[active=true]:border-primary data-[active=true]:text-primary`}
            >
              Tests
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-5 text-sm">
            {activeTab === 'output' && (
              <div className="space-y-3">
                {aiHelp ? (
                  <div className={`${cardClass} whitespace-pre-wrap p-4 text-left text-ink-primary`}>{aiHelp}</div>
                ) : (
                  <pre className="whitespace-pre-wrap text-ink-secondary">{output}</pre>
                )}
              </div>
            )}
            {activeTab === 'tests' && (
              <div className="space-y-3">
                {testResults.length === 0 && <p className="text-ink-muted">Submit your code to run automated tests.</p>}
                {testResults.map((result) => (
                  <div
                    key={result.description}
                    className={`${cardClass} flex flex-col gap-2 border-l-4 ${result.passed ? 'border-success/80' : 'border-danger/80'} p-4`}
                  >
                    <p className={`text-sm font-semibold ${result.passed ? 'text-success' : 'text-danger'}`}>
                      {result.description}
                    </p>
                    {!result.passed && result.error && (
                      <>
                        <p className="text-xs text-ink-muted">{result.error}</p>
                        <button
                          className="text-xs font-semibold text-primary hover:underline"
                          onClick={() => handleExplainError(result.error || 'Test failed')}
                          disabled={isLoading}
                        >
                          Ask AI to explain
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className={`${panelClass} flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between`}>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-ink-primary">Need more guidance?</p>
          <p className="text-xs text-ink-muted">
            Use the AI tutor for contextual hints or review the skill map for prerequisite lessons.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className={outlineButtonClass} onClick={handleRunCode} disabled={isLoading}>
            <span className="text-primary">{ICONS.PLAY}</span>
            <span>{isLoading ? 'Running...' : 'Run code'}</span>
          </button>
          <button className={primaryButtonClass} onClick={handleSubmit} disabled={isLoading}>
            <span className="text-white/90">{ICONS.CHECK}</span>
            <span>{isLoading ? 'Submitting…' : 'Submit lesson'}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LessonView;
