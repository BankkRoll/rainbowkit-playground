// components/WebView.tsx
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WebViewProps {
  code: string;
  showInHeader: boolean;
  headerColor: string;
}

export default function WebView({ code, showInHeader, headerColor }: WebViewProps) {
  const [scope, setScope] = useState({});

  useEffect(() => {
    setScope({ React, ConnectButton });
  }, []);

  return (
    <LiveProvider code={code} scope={scope} noInline>
      <div className="w-full h-[75vh] flex flex-col bg-white text-black rounded-md shadow-lg">
        <LiveError />

        <header style={{ backgroundColor: headerColor }} className="py-6 px-4 text-white shadow-md">
          {showInHeader && <LivePreview />}
        </header>

        <div className="flex-grow">
          <h1 className="text-2xl text-center font-bold justify-center items-center p-4 space-y-4 max-w-lg mx-auto">This example environment and is for example viewing and testing purposes only</h1>
          <p className="text-lg text-center justify-center items-center p-4 space-y-4 max-w-lg mx-auto">You can toggle the button to be in the navbar or the body above depending on your needs</p>

          {!showInHeader && <LivePreview />}
        </div>
      </div>
    </LiveProvider>
  );
}
