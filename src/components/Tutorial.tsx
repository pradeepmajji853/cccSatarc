import React from 'react';
import { BookOpen } from 'lucide-react';
import { lessons } from './lessons';
import { LessonCard } from './LessonCard';

interface TutorialProps {
  currentLesson: number;
  onLessonChange: (index: number) => void;
}

export function Tutorial({ currentLesson, onLessonChange }: TutorialProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Security Tutorial</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {lessons.map((lesson, index) => (
          <LessonCard
            key={index}
            title={lesson.title}
            content={lesson.content}
            example={lesson.example}
            isActive={currentLesson === index}
            onClick={() => onLessonChange(index)}
            index={index}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-cyan-400">
          {lessons[currentLesson].title}
        </h3>
        
        <p className="text-gray-300">
          {lessons[currentLesson].content}
        </p>

        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <code className="text-amber-400 font-mono text-sm">
              Try this example:
            </code>
          </div>
          <pre className="bg-gray-950 p-3 rounded text-sm text-gray-300 font-mono">
            {lessons[currentLesson].example}
          </pre>
        </div>
      </div>
    </div>
  );
}