// components/WebView.tsx
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WebViewProps {
  code: string;
}

export default function WebView({ code }: WebViewProps) {
  const [scope, setScope] = useState({});

  useEffect(() => {
    setScope({ React, ConnectButton });
  }, []);

  return (
    <LiveProvider code={code} scope={scope} noInline>
      <div className="w-full h-[87vh] flex flex-col bg-white text-black rounded-md shadow-lg">
        <LiveError />
        <div className="flex-grow">
        <header className="flex items-center justify-between py-6 px-4 bg-blue-500 text-white shadow-md">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">Rainbow Playground</h1>
      </div>
    </header>

          <LivePreview />
        </div>
    </div>
    </LiveProvider>
  );
}
