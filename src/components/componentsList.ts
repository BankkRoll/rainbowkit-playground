// components/componentsList.ts

export const components = [
  { label: 'Select a component', code: '' },
  { label: 'Default ConnectButton', code: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
  );` },
  { label: 'ConnectButton with custom label', code: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton label="Sign in" />
    </div>
  );` },
  { label: 'ConnectButton showing only account avatar', code: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton accountStatus="avatar" />
    </div>
  );` },
  { label: 'ConnectButton showing only chain name', code: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton chainStatus="name" />
    </div>
  );` },
  { label: 'ConnectButton hiding balance', code: `return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton showBalance={false} />
    </div>
  );` },
  { label: 'ConnectButton responsive', code: `return (
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
  );` },
];
