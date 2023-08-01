// utils/componentsList.ts
const defaultAppCode = `import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import type { AppProps } from 'next/app';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});
      
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}`;



export const components = [
    { 
      label: 'Default ConnectButton', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
  );`,
    info: 'Displays a default ConnectButton with no customization.' 
    },
    
    { 
      label: 'ConnectButton custom label', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton label="Sign in" />
    </div>
  );`,
    info: 'Displays a ConnectButton with a custom label "Sign in".' 
    },

    { 
      label: 'Signedin only show account avatar', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton accountStatus="avatar" />
    </div>
  );`, 
    info: 'Displays an account avatar only when the user is signed in.' 
    },
    
    { 
      label: 'Signedin only show chain name', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton chainStatus="name" />
    </div>
  );`, 
    info: 'Displays a chain name only when the user is signed in.' 
    },
    
    { 
      label: 'Signedin hiding balance', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton showBalance={false} />
    </div>
  );`, 
    info: 'Hides the balance when the user is signed in.' 
    },
    
    { 
      label: 'ConnectButton responsive', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
      />
    </div>
  );`, 
    info: 'Displays a responsive ConnectButton that adapts to screen size.' 
    },
    
    { 
      label: 'Signedin with account address', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton accountStatus="address" />
    </div>
  );`, 
    info: 'Displays the account address when the user is signed in.' 
    },
    
    { 
      label: 'Signedin with chain icon', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton chainStatus="icon" />
    </div>
  );`, 
    info: 'Displays a chain icon when the user is signed in.' 
    },
    
    { 
      label: 'Signedin hiding chain UI', 
      appCode: defaultAppCode,
      indexCode: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton chainStatus="none" />
    </div>
  );`, 
    info: 'Hides the chain UI when the user is signed in.' 
    },
  ];
  