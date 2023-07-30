// pages/live-code-editor.tsx
import { useState, useEffect } from 'react'; // Import useEffect
import CodeEditor, { themes, ThemeName } from '../components/CodeEditor';
import WebView from '../components/WebView';
import { components } from '../components/componentsList';

export default function LiveCodeEditorPage() {
  const [functionalCode, setFunctionalCode] = useState('');
  const [displayCode, setDisplayCode] = useState('');
  const [selected, setSelected] = useState('Default ConnectButton');
  const [theme, setTheme] = useState<ThemeName>('Monokai');
  const [isCopied, setIsCopied] = useState(false);
  const [info, setInfo] = useState('');

  const insertComponent = (componentLabel: string) => {
    const component = components.find(comp => comp.label === componentLabel);
    if (component) {
      // Functional code with wrapping
      const newFunctionalCode = `const MyComponent = () => {${component.code}};\n\nrender(<MyComponent />);`;
      setFunctionalCode(newFunctionalCode);
      
      // Display code without wrapping
      setDisplayCode(component.code);
      
      // Set component info
      setInfo(component.info);
    }
  };

  // Call insertComponent after the component has mounted
  useEffect(() => {
    insertComponent('Default ConnectButton');
  }, []); 
  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
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
        <h2 className="text-lg font-bold mb-4">Rainbowkit Playground</h2>

        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800">
          <select
            className="p-2 rounded-lg bg-gray-700 text-white max-w-xs shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-600"
            value={selected}
            onChange={handleSelectChange}
          >
            {components.map((comp) => (
              <option key={comp.label} value={comp.label}>{comp.label}</option>
            ))}
          </select>
          <select
            className="p-2 rounded-lg bg-gray-700 text-white max-w-xs shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-600"
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
            className={`p-2 rounded-lg bg-gray-700 text-white shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2`}
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
