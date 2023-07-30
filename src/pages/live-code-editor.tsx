import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import WebView from '../components/WebView';
import { components } from '../components/componentsList';

export default function LiveCodeEditorPage() {
  const [functionalCode, setFunctionalCode] = useState('const MyComponent = () => { return null; };\n\nrender(<MyComponent />);');
  const [displayCode, setDisplayCode] = useState('return null;');
  const [selected, setSelected] = useState('');

  const insertComponent = (componentLabel: string) => {
    const component = components.find(comp => comp.label === componentLabel);
    if (component) {
      // Functional code with wrapping
      const newFunctionalCode = `const MyComponent = () => {${component.code}};\n\nrender(<MyComponent />);`;
      setFunctionalCode(newFunctionalCode);
      
      // Display code without wrapping
      setDisplayCode(component.code);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayCode);
  };

  const handleEditorChange = (value: string) => {
    setDisplayCode(value);
    const newFunctionalCode = `const MyComponent = () => {${value}};\n\nrender(<MyComponent />);`;
    setFunctionalCode(newFunctionalCode);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    insertComponent(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/2 border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4">Live Code Editor</h2>

        <div className="flex items-center justify-between p-4 bg-gray-800">
          <select
            className="p-2 rounded-md bg-white text-black"
            value={selected}
            onChange={handleSelectChange}
          >
            {components.map((comp) => (
              <option key={comp.label} value={comp.label}>{comp.label}</option>
            ))}
          </select>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-md bg-green-500 hover:bg-green-700 text-white"        
          >
            Copy to Clipboard
          </button>
        </div>

        <CodeEditor initialCode={displayCode} setCode={handleEditorChange} />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Live Preview</h2>
        <WebView code={functionalCode} />
      </div>
    </div>
  );
}
