
import React from 'react';
import { LearningNode, NodeStatus, NodeType } from '../types';
import { LEARNING_NODES, LEARNING_EDGES } from '../constants';

interface LearningPathProps {
  onNodeSelect: (lessonId: string) => void;
}

const getNodeColor = (status: NodeStatus, type: NodeType) => {
    if (status === NodeStatus.LOCKED) return 'bg-slate-700 text-slate-500';
    if (status === NodeStatus.COMPLETED) return 'bg-success text-white';
    if (status === NodeStatus.IN_PROGRESS) return 'bg-warning text-white ring-4 ring-yellow-400/50';
    if (type === NodeType.PROJECT) return 'bg-blue-500 text-white';
    return 'bg-primary text-white';
};

const getEdgeColor = (fromStatus: NodeStatus) => {
    return fromStatus === NodeStatus.COMPLETED ? 'stroke-success' : 'stroke-border-color';
};

const Node: React.FC<{ node: LearningNode; onClick: () => void }> = ({ node, onClick }) => {
    const colorClasses = getNodeColor(node.status, node.type);
    const isClickable = node.status !== NodeStatus.LOCKED;
    const shapeClass = node.type === NodeType.QUIZ ? 'w-20 h-20 transform -rotate-45' : 'w-24 h-24 rounded-full';

    return (
        <div 
            className={`absolute flex items-center justify-center transition-all duration-300 ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`} 
            style={{ left: `${node.position.x * 10 - 5}rem`, top: `${node.position.y * 6 - 3}rem` }}
            onClick={isClickable ? onClick : undefined}
        >
            <div className={`flex items-center justify-center ${shapeClass} ${colorClasses}`}>
                <div className={`${node.type === NodeType.QUIZ ? 'transform rotate-45' : ''} text-center`}>
                    <div className="w-8 h-8 mx-auto">{node.icon}</div>
                </div>
            </div>
            <div className="absolute -bottom-8 w-32 text-center">
                 <p className="font-semibold text-sm text-text-primary">{node.title}</p>
                 <p className="text-xs text-text-secondary">{node.status.replace('_', ' ')}</p>
            </div>
        </div>
    );
};


const LearningPath: React.FC<LearningPathProps> = ({ onNodeSelect }) => {
    const nodeMap = new Map(LEARNING_NODES.map(node => [node.id, node]));

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-text-primary">Python Skill Map</h1>
            <p className="text-text-secondary mb-8">Your journey to becoming a Python master. Select a node to begin.</p>
            <div className="relative w-full h-[40rem] bg-grid-pattern rounded-lg p-4 overflow-auto">
                 <svg className="absolute top-0 left-0 w-full h-full" style={{ width: '2000px', height: '1000px' }}>
                    <defs>
                        <marker id="arrowhead-completed" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" className="fill-success" />
                        </marker>
                         <marker id="arrowhead-default" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" className="fill-border-color" />
                        </marker>
                    </defs>
                    {LEARNING_EDGES.map((edge, i) => {
                        const fromNode = nodeMap.get(edge.from);
                        const toNode = nodeMap.get(edge.to);
                        if (!fromNode || !toNode) return null;
                        
                        const x1 = fromNode.position.x * 10;
                        const y1 = fromNode.position.y * 6;
                        const x2 = toNode.position.x * 10;
                        const y2 = toNode.position.y * 6;

                        const edgeColor = getEdgeColor(fromNode.status);
                        const marker = fromNode.status === NodeStatus.COMPLETED ? 'url(#arrowhead-completed)' : 'url(#arrowhead-default)';
                        
                        const dx = x2 - x1;
                        const dy = y2 - y1;
                        const length = Math.sqrt(dx * dx + dy * dy);
                        const endX = x2 - (dx / length) * 3.5;
                        const endY = y2 - (dy / length) * 3.5;

                        return (
                            <line
                                key={i}
                                x1={`${x1}rem`} y1={`${y1}rem`}
                                x2={`${endX}rem`} y2={`${endY}rem`}
                                className={`${edgeColor} stroke-2 transition-all duration-500`}
                                markerEnd={marker}
                            />
                        );
                    })}
                </svg>

                {LEARNING_NODES.map(node => (
                    <Node key={node.id} node={node} onClick={() => onNodeSelect(node.id)} />
                ))}
            </div>
        </div>
    );
};

export default LearningPath;
