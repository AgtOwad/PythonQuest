import React from 'react';
import { NodeStatus, NodeType } from '../types';
import { LEARNING_NODES, LEARNING_EDGES } from '../constants';
import { panelClass, sectionHeadingClass, sectionSubtitleClass, pillMutedClass } from './ui/primitives';

interface LearningPathProps {
  onNodeSelect: (lessonId: string) => void;
}

const statusStyle = (status: NodeStatus) => {
  switch (status) {
    case NodeStatus.COMPLETED:
      return 'bg-success/20 text-success border-success/30 shadow-elevation-1';
    case NodeStatus.IN_PROGRESS:
      return 'bg-warning/20 text-warning border-warning/40 shadow-elevation-1 animate-pulse';
    case NodeStatus.UNLOCKED:
      return 'bg-primary/20 text-primary border-primary/30 shadow-elevation-1';
    default:
      return 'bg-surface-border/50 text-ink-muted border-surface-border/60';
  }
};

const shapeForType = (type: NodeType) => {
  switch (type) {
    case NodeType.QUIZ:
      return 'rotate-45';
    case NodeType.PROJECT:
      return 'rounded-2xl';
    default:
      return 'rounded-full';
  }
};

const LearningPath: React.FC<LearningPathProps> = ({ onNodeSelect }) => {
  const nodeMap = new Map(LEARNING_NODES.map((node) => [node.id, node]));

  return (
    <div className="space-y-6">
      <header className={`${panelClass} p-6 sm:p-8`}>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className={`${sectionHeadingClass} text-3xl`}>Skill Map</h1>
            <p className={sectionSubtitleClass}>
              Unlock lessons, quizzes, and projects along a clear progression path. Nodes pulse when new challenges are available.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-ink-muted">
            <span className={pillMutedClass}>Completed</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">
              In progress
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              Ready to start
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-border/70 px-3 py-1 text-xs font-semibold text-ink-muted">
              Locked
            </span>
          </div>
        </div>
      </header>

      <section className={`${panelClass} overflow-hidden p-0`}> 
        <div className="learning-grid relative h-[36rem] min-h-[28rem] overflow-auto rounded-3xl border border-transparent p-8">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ width: '2000px', height: '1000px' }}>
            <defs>
              <marker id="arrow-complete" markerWidth="16" markerHeight="16" refX="12" refY="6" orient="auto">
                <path d="M0,0 L12,6 L0,12 z" className="fill-success" />
              </marker>
              <marker id="arrow-default" markerWidth="16" markerHeight="16" refX="12" refY="6" orient="auto">
                <path d="M0,0 L12,6 L0,12 z" className="fill-surface-border" />
              </marker>
            </defs>
            {LEARNING_EDGES.map((edge) => {
              const fromNode = nodeMap.get(edge.from);
              const toNode = nodeMap.get(edge.to);
              if (!fromNode || !toNode) return null;

              const x1 = fromNode.position.x * 10;
              const y1 = fromNode.position.y * 6;
              const x2 = toNode.position.x * 10;
              const y2 = toNode.position.y * 6;

              const dx = x2 - x1;
              const dy = y2 - y1;
              const length = Math.sqrt(dx * dx + dy * dy);
              const endX = x2 - (dx / length) * 4;
              const endY = y2 - (dy / length) * 4;
              const completed = fromNode.status === NodeStatus.COMPLETED;

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={`${x1}rem`}
                  y1={`${y1}rem`}
                  x2={`${endX}rem`}
                  y2={`${endY}rem`}
                  className={`${completed ? 'stroke-success/70' : 'stroke-surface-border/80'} stroke-[3] transition`}
                  markerEnd={completed ? 'url(#arrow-complete)' : 'url(#arrow-default)'}
                />
              );
            })}
          </svg>

          {LEARNING_NODES.map((node) => {
            const statusClass = statusStyle(node.status);
            const shape = shapeForType(node.type);
            const isLocked = node.status === NodeStatus.LOCKED;
            const positionStyle = {
              left: `${node.position.x * 10 - 5}rem`,
              top: `${node.position.y * 6 - 3}rem`,
            };

            return (
              <button
                key={node.id}
                style={positionStyle}
                onClick={() => !isLocked && onNodeSelect(node.id)}
                className={`absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border text-sm font-semibold transition focus-visible:outline-none focus-visible:shadow-focus ${
                  isLocked ? 'cursor-not-allowed opacity-70' : 'hover:scale-105'
                }`}
                aria-disabled={isLocked}
              >
                <span className={`flex h-20 w-20 items-center justify-center ${statusClass} ${shape}`}>
                  <span className={`${node.type === NodeType.QUIZ ? '-rotate-45' : ''} text-lg`}>{node.icon}</span>
                </span>
                <span className="mt-3 text-center text-xs font-semibold text-ink-primary">{node.title}</span>
                <span className="text-[0.6rem] uppercase tracking-[0.18em] text-ink-muted">
                  {node.status.replace('_', ' ')}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default LearningPath;
