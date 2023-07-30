// pages/live-code-editor.tsx
import { useState } from 'react';
import CodeEditor, { themes, ThemeName } from '../components/CodeEditor';
import WebView from '../components/WebView';
import { components } from '../components/componentsList';

export default function LiveCodeEditorPage() {
  const [functionalCode, setFunctionalCode] = useState('const MyComponent = () => { return null; };\n\nrender(<MyComponent />);');
  const [displayCode, setDisplayCode] = useState('return null;');
  const [selected, setSelected] = useState('');
  const [theme, setTheme] = useState<ThemeName>('Monokai');
  const [isCopied, setIsCopied] = useState(false);
  const [info, setInfo] = useState(''); // Add this line

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const insertComponent = (componentLabel: string) => {
    const component = components.find(comp => comp.label === componentLabel);
    if (component) {
      // Functional code with wrapping
      const newFunctionalCode = `const MyComponent = () => {${component.code}};\n\nrender(<MyComponent />);`;
      setFunctionalCode(newFunctionalCode);
      
      // Display code without wrapping
      setDisplayCode(component.code);
      
      // Set component info
      setInfo(component.info); // Add this line
    }
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

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as ThemeName);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/2 border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4">Live Code Editor</h2>

        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800">
          <select
            className="p-2 rounded-md bg-white text-black max-w-xs"
            value={selected}
            onChange={handleSelectChange}
          >
            {components.map((comp) => (
              <option key={comp.label} value={comp.label}>{comp.label}</option>
            ))}
          </select>
          <select
            className="p-2 rounded-md bg-white text-black max-w-xs"
            value={theme}
            onChange={handleThemeChange}
          >
            {Object.keys(themes).map((theme) => (
              <option key={theme} value={theme}>{theme.replace(/_/g, ' ')}</option>
            ))}
          </select>

          <div className="text-right">
          <button
              onClick={copyToClipboard}
              className={`p-2 rounded-md text-white ${isCopied ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'}`}        
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="pb-4 pl-4 bg-gray-800 text-gray-200">
          {info}
        </div>

        <CodeEditor initialCode={displayCode} setCode={handleEditorChange} theme={theme} />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Live Preview</h2>
        <WebView code={functionalCode} />
      </div>
    </div>
  );
}
