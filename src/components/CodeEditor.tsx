// components/CodeEditor.tsx
import React, { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ initialCode, onChange }: CodeEditorProps) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    // here is the editor instance
    editorRef.current = editor;
  }

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      onChange(value);
    }
  }

  return (
    <div>
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue={initialCode}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
}
