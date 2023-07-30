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
      <div className="w-full h-[87vh] flex flex-col bg-white text-black p-4 rounded-md shadow-lg">
        <LiveError />
        <div className="flex-grow">
          <LivePreview />
        </div>
    </div>
    </LiveProvider>
  );
}
