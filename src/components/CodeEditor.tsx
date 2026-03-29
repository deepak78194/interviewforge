'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
  className?: string;
}

export function CodeEditor({ value, onChange, language = 'javascript', height = '300px', readOnly = false, className }: CodeEditorProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return (
      <textarea
        value={value}
        onChange={e => onChange?.(e.target.value)}
        readOnly={readOnly}
        className={cn(
          'w-full font-mono text-sm border border-input rounded-md bg-background p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y',
          className
        )}
        style={{ height }}
      />
    );
  }

  return (
    <div className={cn('border border-input rounded-md overflow-hidden', className)} style={{ height }}>
      <MonacoEditor
        height={height}
        language={language}
        value={value}
        onChange={val => onChange?.(val ?? '')}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
        }}
        theme="vs-dark"
      />
    </div>
  );
}
