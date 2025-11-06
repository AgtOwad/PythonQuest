
import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { ICONS } from '../constants';
import { getHintForCode, explainCodeError } from '../services/geminiService';

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
  }, [lesson]);

  const handleRunCode = () => {
    setOutput('Running code...');
    try {
      // In a real app, this would be a secure sandbox environment.
      // Using Function constructor for a slightly safer eval.
      const capturedOutput: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedOutput.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
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
    
    // Simulate async test running
    setTimeout(() => {
        const results = lesson.tests.map(test => {
            try {
                new Function(code + '\n' + test.code)();
                return { description: test.description, passed: true };
            } catch (e: any) {
                return { description: test.description, passed: false, error: e.message };
            }
        });
        setTestResults(results);
        setIsLoading(false);
        if (results.every(r => r.passed)) {
            onComplete(100, 10);
        }
    }, 1000);
  };
  
  const handleGetHint = async () => {
    setIsLoading(true);
    setAiHelp('Getting a hint from your AI Tutor...');
    const hint = await getHintForCode(code, lesson.description);
    setAiHelp(hint);
    setIsLoading(false);
    setActiveTab('output');
  };

  const handleExplainError = async (error: string) => {
    setIsLoading(true);
    setAiHelp('Asking AI Tutor to explain this error...');
    const explanation = await explainCodeError(code, error);
    setAiHelp(explanation);
    setIsLoading(false);
    setActiveTab('output');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-text-primary">{lesson.title}</h1>
        <p className="text-text-secondary">{lesson.description}</p>
      </div>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-220px)]">
        {/* Code Editor */}
        <div className="flex flex-col bg-surface rounded-lg">
          <textarea
            className="w-full h-full p-4 bg-transparent text-text-primary font-mono resize-none focus:outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>
        
        {/* Output/Tests */}
        <div className="flex flex-col bg-surface rounded-lg">
          <div className="flex border-b border-border-color">
            <button onClick={() => setActiveTab('output')} className={`px-4 py-2 ${activeTab === 'output' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}>Output</button>
            <button onClick={() => setActiveTab('tests')} className={`px-4 py-2 ${activeTab === 'tests' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}>Tests</button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto font-mono text-sm">
            {activeTab === 'output' && (
              aiHelp ? (
                <div className="text-text-primary whitespace-pre-wrap">{aiHelp}</div>
              ) : (
                <pre className="text-text-secondary whitespace-pre-wrap">{output}</pre>
              )
            )}
            {activeTab === 'tests' && (
              <div>
                {testResults.length === 0 && <p className="text-text-secondary">Submit your code to run tests.</p>}
                {testResults.map((result, i) => (
                  <div key={i} className={`flex items-start p-2 rounded mb-2 ${result.passed ? 'bg-success/10' : 'bg-error/10'}`}>
                    <div className={`mr-3 mt-1 w-5 h-5 ${result.passed ? 'text-success' : 'text-error'}`}>{result.passed ? ICONS.CHECK : 'X'}</div>
                    <div className="flex-1">
                        <p className={`${result.passed ? 'text-success' : 'text-error'} font-semibold`}>{result.description}</p>
                        {!result.passed && result.error && (
                            <>
                                <p className="text-xs text-error/80 mt-1">{result.error}</p>
                                <button onClick={() => handleExplainError(result.error || 'Test failed')} disabled={isLoading} className="text-xs text-primary hover:underline mt-1 disabled:opacity-50">Explain Error with AI</button>
                            </>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-color">
        <div>
          <button onClick={handleGetHint} disabled={isLoading} className="flex items-center bg-transparent border border-border-color text-text-secondary font-semibold py-2 px-4 rounded-lg hover:bg-surface disabled:opacity-50 transition-colors">
            {ICONS.HINT} <span className="ml-2">Get a Hint</span>
          </button>
        </div>
        <div className="flex space-x-2">
            <button onClick={handleRunCode} disabled={isLoading} className="flex items-center bg-surface hover:bg-opacity-80 text-text-primary font-bold py-2 px-4 rounded-lg disabled:opacity-50 transition-colors">
                {ICONS.PLAY} <span className="ml-2">Run Code</span>
            </button>
            <button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 transition-colors">
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
