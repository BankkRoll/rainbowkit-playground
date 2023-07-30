// components/CodeEditor.tsx
import React, { useEffect, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  setCode: (value: string) => void;
}

export default function CodeEditor({ initialCode, setCode }: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Save the current cursor position
      const position = editorRef.current.getPosition();

      // Update the editor's value
      const model = editorRef.current.getModel();
      if (model) {
        model.setValue(initialCode);
      }

      // Restore the cursor position
      editorRef.current.setPosition(position);
      editorRef.current.focus();
    }
  }, [initialCode]);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      setCode(value);
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
