import React from 'react';
import { BookOpen } from 'lucide-react';

interface LessonCardProps {
  title: string;
  content: string;
  example: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export function LessonCard({ title, isActive, onClick, index }: LessonCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg text-sm font-medium transition
        ${isActive 
          ? 'bg-cyan-500 text-white' 
          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`}
    >
      Lesson {index + 1}
    </button>
  );
}