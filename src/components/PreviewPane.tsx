import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { sanitizeHtml } from './sanitise';

interface PreviewPaneProps {
  content: string;
  showUnsafe: boolean;
}

export function PreviewPane({ content, showUnsafe }: PreviewPaneProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-green-400">
          <ShieldAlert className="w-5 h-5" />
          <h2 className="font-semibold">Protected Preview</h2>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 min-h-[100px] relative">
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
        </div>
        <p className="text-xs text-gray-400">
          ✓ HTML is sanitized to prevent XSS attacks
        </p>
      </div>

      {showUnsafe && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-semibold">Vulnerable Preview</h2>
          </div>
          <div className="bg-gray-900/50 border border-red-900/50 rounded-lg p-4 min-h-[100px] relative overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <p className="text-xs text-red-400">
            ⚠️ Dangerous: No protection against XSS attacks
          </p>
        </div>
      )}
    </div>
  );
}