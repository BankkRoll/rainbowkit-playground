// pages/live-code-editor.tsx
import { useState, useEffect } from 'react';
import CodeEditor, { themes, ThemeName } from '../components/CodeEditor';
import WebView from '../components/WebView';
import { components } from '../components/componentsList';
import { Tab } from '@headlessui/react';

export default function LiveCodeEditorPage() {
  const [functionalCode, setFunctionalCode] = useState('');
  const [displayCode, setDisplayCode] = useState('');
  const [selected, setSelected] = useState('Default ConnectButton');
  const [theme, setTheme] = useState<ThemeName>('Monokai');
  const [isCopied, setIsCopied] = useState(false);
  const [info, setInfo] = useState('');
  const [showInHeader, setShowInHeader] = useState(true);
  const [headerColor, setHeaderColor] = useState('#3b21f6');
  const [selectedTab, setSelectedTab] = useState('index.tsx');
  const [liveCode, setLiveCode] = useState('');
  
  const tabs = [
    { name: 'index.tsx', component: 'ConnectButtonIndex' },
    { name: 'App.tsx', component: 'ConnectButtonApp' },
  ]
  
  function wrapInNextPage(componentCode: string) {
    return `import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
    
const Home: NextPage = () => {
  ${componentCode}
};
    
export default Home;`;
  }

  function extractReturnStatement(code: string): string {
    const returnStatementRegex = /return\s*\(([\s\S]*?)\)\s*;/g;
    const match = returnStatementRegex.exec(code);
    return match && match[1] ? match[1] : '';
  }

  const insertComponent = (componentLabel: string) => {
    const component = components.find(comp => comp.label === componentLabel);
    if (component) {
      const codeToInsert = component.indexCode; // Always use indexCode

      // Display code with wrapping
      const displayCodeWithWrapper = wrapInNextPage(codeToInsert);
      setDisplayCode(displayCodeWithWrapper);

      // Set component info
      setInfo(component.info);
    }
  };

  const handleEditorChange = (value: string) => {
    setDisplayCode(value);
  };

  useEffect(() => {
    if (selectedTab === 'index.tsx') {
      const returnStatement = extractReturnStatement(displayCode);
      if (returnStatement) {
        const executableCode = `const MyComponent = () => {return (${returnStatement})};\n\nrender(<MyComponent />);`;
        setLiveCode(executableCode);
      }
    }
  }, [displayCode, selectedTab]);


  // Call insertComponent after the component has mounted
  useEffect(() => {
    insertComponent('Default ConnectButton');
  }, []); 
  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
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


        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900 rounded-xl">
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                onClick={() => {
                  setSelectedTab(tab.name);
                  if (tab.name === 'App.tsx') {
                    const component = components.find(comp => comp.label === selected);
                    if (component) {
                      setDisplayCode(component.appCode);
                    }
                  } else {
                    insertComponent(selected);
                  }
                }}
                className={({ selected }) =>
                  selected
                    ? 'w-full py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg'
                    : 'w-full py-2.5 text-sm font-medium text-white rounded-lg'
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>


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

        <div className="flex justify-between items-center gap-4 p-4 bg-gray-800">
          <button
            onClick={() => setShowInHeader(!showInHeader)}
            className="p-2 rounded-lg bg-gray-700 text-white shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2"
          >
            Toggle Button Position
          </button>
          <div className="text-right">
            <label htmlFor="headerColor" className="block text-sm text-white">Header Color</label>
            <div 
              className="w-12 h-12 rounded-full shadow-lg cursor-pointer" 
              style={{ backgroundColor: headerColor }}
            >
              <input
                id="headerColor"
                type="color"
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
                className="w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <WebView code={liveCode} showInHeader={showInHeader} headerColor={headerColor} />
      </div>
    </div>
  );
}
