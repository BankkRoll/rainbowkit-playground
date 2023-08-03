// pages/_app.tsx
import React, { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  goerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId: "5f855432faf01e0ac3a41e0c83ff1ae8",
  chains,
});

const connectors = connectorsForWallets(wallets);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [coolMode, setCoolMode] = useState(false);
  const [theme, setTheme] = useState(darkTheme);

  // provide a function to toggle cool mode
  const toggleCoolMode = () => setCoolMode((prevMode) => !prevMode);

  // provide a function to customize theme
  const customizeTheme = (options: any) => setTheme(darkTheme(options));

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode={coolMode} theme={theme} chains={chains}>
        <Component
          {...pageProps}
          onToggleCoolMode={toggleCoolMode}
          onCustomizeTheme={customizeTheme}
        />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
