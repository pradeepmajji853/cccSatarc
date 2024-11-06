import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import { lessons } from '../components/lessons';
import { Tutorial } from '../components/Tutorial';
import { PreviewPane } from '../components/PreviewPane';

function HTMLPreview() {
  const [input, setInput] = useState('');
  const [showUnsafe, setShowUnsafe] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);

  const handleLessonChange = (index: number) => {
    setCurrentLesson(index);
    setInput(lessons[index].example);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-cyan-400 flex items-center justify-center gap-3">
          <Code2 className="w-8 h-8" />
          HTML Security Lab
        </h1>
        <p className="text-gray-400">Learn about HTML injection and security best practices</p>
      </div>

      <Tutorial currentLesson={currentLesson} onLessonChange={handleLessonChange} />

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Try Your Own HTML
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-3 rounded-lg border border-gray-600 bg-gray-900/50 text-white 
                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                     placeholder-gray-500"
            placeholder="<h1>Hello World</h1>"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showUnsafe"
            checked={showUnsafe}
            onChange={(e) => setShowUnsafe(e.target.checked)}
            className="rounded border-gray-600 bg-gray-900 text-cyan-500 focus:ring-cyan-500"
          />
          <label htmlFor="showUnsafe" className="text-sm text-gray-300">
            Enable unsafe preview (for demonstration)
          </label>
        </div>

        <PreviewPane content={input} showUnsafe={showUnsafe} />
      </div>

      <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-4">
        <h3 className="text-amber-400 font-semibold mb-2">
          Security Best Practices
        </h3>
        <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
          <li>Always sanitize HTML content in production applications</li>
          <li>Use content security policies (CSP) to prevent script execution</li>
          <li>Consider using markdown or other safer alternatives when possible</li>
          <li>Regular security audits help identify potential vulnerabilities</li>
        </ul>
      </div>
    </div>
  );
}

export default HTMLPreview;