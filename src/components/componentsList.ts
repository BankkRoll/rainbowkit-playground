// components/componentsList.ts

export const components = [
    { 
      label: 'Select a component', 
      code: '', 
      info: '' 
    },
    
    { 
      label: 'Default ConnectButton', 
      code: `return (
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
      code: `return (
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
      code: `return (
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
      code: `return (
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
      code: `return (
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
      code: `return (
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
      code: `return (
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
      code: `return (
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
      code: `return (
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
    
    { 
      label: 'Fully Custom ConnectButton', 
      code: `return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button">
                      Connect Wallet
                    </button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }
  
                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
  
                    <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? \` (\${account.displayBalance})\`
                      : ''}
                  </button>
                  
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );`, 
      info: 'Fully customizable ConnectButton with complete control over rendering.' 
    },
  ];
  