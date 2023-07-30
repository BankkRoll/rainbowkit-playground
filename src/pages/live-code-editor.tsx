// pages/live-code-editor.tsx
import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import WebView from '../components/WebView';
import ComponentConfigurator from '../components/ComponentConfigurator';

export default function LiveCodeEditorPage() {
  const [code, setCode] = useState('const MyComponent = () => { return null; };\n\nrender(<MyComponent />);');

  const handleInsert = (componentCode: string) => {
    const newCode = `const MyComponent = () => {${componentCode}};\n\nrender(<MyComponent />);`;
    setCode(newCode);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/2 border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4">Live Code Editor</h2>
        <ComponentConfigurator onInsert={handleInsert} code={code} />
        <CodeEditor key={code} initialCode={code} onChange={setCode} />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Live Preview</h2>
        <WebView code={code} />
      </div>
    </div>
  );
}
