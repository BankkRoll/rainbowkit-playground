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

export default function HomePage() {
  ${componentCode}
};`;
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

      {/* Code Editor */}
      <div className="w-1/2 border-r border-gray-700 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 01 1-1" />
              </svg>
          </Link>
          <h2 className="text-lg font-bold">RainbowKit Playground</h2>
        </div>

        {/* Tabs */}
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

        {/* Component and theme selectors, Copy button */}
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

      {/* Live Preview */}
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Live Preview</h2>
        <div className="flex justify-between items-center gap-4 p-4 bg-gray-800">

        {/* Toggle Button */}
        <div className="flex items-center space-x-4">
        <label htmlFor="headerColor" className="flex items-center text-sm text-white cursor-pointer">Position:</label>
          <label htmlFor="toggle" className="flex items-center text-sm text-white cursor-pointer">
            <div className="relative bg-gray-200 w-28 h-8 rounded-full shadow-inner flex items-center transition-colors duration-200 ease-in-out" style={{ backgroundColor: showInHeader ? 'gray' : 'gray' }}>
              <input type="checkbox" id="toggle" className="hidden" checked={showInHeader} onChange={() => setShowInHeader(!showInHeader)} />
              <div className={`absolute left-2 h-6 w-12 rounded-full bg-white flex items-center justify-center transition-transform duration-200 ease-in-out ${showInHeader ? 'transform translate-x-full' : ''}`}>
                <span className="text-sm text-black">{showInHeader ? 'Header' : 'Body'}</span>
              </div>
            </div>
            </label>
        </div>

          {/* Color Picker */}
          <div className="flex items-center space-x-2">
            <label htmlFor="headerColor" className="block text-sm text-white">Header Color:</label>
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

        <div className="mt-4 bg-gray-200 rounded flex items-center px-3 py-2">

          {/* Back and forward buttons */}
          <div className="flex space-x-2 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" d="M4.5 12H21m-10.5 6.375L4.125 12 10.5 5.625"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" d="M19.5 12H3m10.5-6.375L19.875 12 13.5 18.375"/>
            </svg>
          </div>

          {/* Refresh button */}
          <p className="mr-2">
            <svg width="18" height="18" viewBox="0 0 0.338 0.338" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M.315.169A.147.147 0 0 0 .169.023V0a.169.169 0 0 1 .115.293h.053v.022h-.09v-.09H.27v.05A.146.146 0 0 0 .315.169ZM.054.045H0V.023h.09v.09H.068v-.05A.147.147 0 0 0 .17.315v.023A.169.169 0 0 1 .054.045Z" fill="#000"/>
            </svg>
          </p>

          {/* URL Bar */}
          <span className="text-sm text-gray-600">https://</span>
          <span className="ml-2 text-sm text-gray-800 font-medium">rainbowkit-playground-example.bankk</span>

          {/* Bookmark links */}
          <div className="ml-auto flex space-x-2">
            <div className="w-6 h-6 p-1 bg-gray-400 rounded">
              <a href="https://x.com/bankkroll_eth" target="_blank" className="w-4 h-4">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              </a>
            </div>
            <div className="w-6 h-6 p-1 bg-gray-400 rounded">
              <a href="https://github.com/BankkRoll" target="_blank" className="w-4 h-4">
                <svg height="24" aria-hidden="true" viewBox="0 0 24 24" width="24" data-view-component="true" className="octicon octicon-mark-github v-align-middle color-fg-default">
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
        <WebView code={liveCode} showInHeader={showInHeader} headerColor={headerColor} />
      </div>
    </div>
    </>
  );
}
