// pages/live-code-editor.tsx
import { useState, useEffect } from 'react';
import CodeEditor, { themes, ThemeName } from '../components/CodeEditor';
import WebView from '../components/WebView';
import { components } from '../utils/componentsList';
import { Tab } from '@headlessui/react';
import Head from 'next/head';
import Link from 'next/link';

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
    { name: '_app.tsx', component: 'ConnectButtonApp' },
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
    <>
    <Head>
      <title>Playground | RainbowKit Playground</title>
      <meta name="author" content="Bankkroll" />
      <meta name="description" content="Interactively play with RainbowKit components" />
      <meta name="keywords" content="RainbowKit, Playground, Interactive, React Components" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://rainbowkit-playground.vercel.app/live-code-editor" />
      <meta property="og:title" content="RainbowKit Playground" />
      <meta property="og:description" content="Interactively play with RainbowKit components" />
      <meta property="og:image" content="https://rainbowkit-playground.vercel.app/logo.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://rainbowkit-playground.vercel.app/live-code-editor" />
      <meta property="twitter:title" content="RainbowKit Playground" />
      <meta property="twitter:description" content="Interactively play with RainbowKit components" />
      <meta property="twitter:image" content="https://rainbowkit-playground.vercel.app/logo.jpg" />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content="RainbowKit Playground" />
      <meta itemProp="description" content="Interactively play with RainbowKit components" />
      <meta itemProp="image" content="https://rainbowkit-playground.vercel.app/logo.jpg" />
      <meta itemProp="url" content="https://rainbowkit-playground.vercel.app/live-code-editor" />
      <meta itemProp="author" content="Bankkroll" />
    </Head>

    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/2 border-r border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Link href="/">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 01 1-1" />
            </svg>
        </Link>
        <h2 className="text-lg font-bold">Rainbowkit Playground</h2>
      </div>

        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900 rounded-xl">
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                onClick={() => {
                  setSelectedTab(tab.name);
                  if (tab.name === '_app.tsx') {
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
    </>
  );
}
