// components/ComponentConfigurator.tsx
import { useState } from 'react';

const components = [
  { label: 'Select a component', code: '' },
  { label: 'ConnectButton', code: `
    const MyComponent = () => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 12,
          }}
        >
          <ConnectButton />
        </div>
      );
    };

    render(<MyComponent />);
  ` },
];

export default function ComponentConfigurator({ onInsert, code }: { onInsert: (code: string) => void, code: string }) {
  const [selected, setSelected] = useState('');

  const insertComponent = (componentLabel: string) => {
    const component = components.find(comp => comp.label === componentLabel);
    if (component) {
      onInsert(component.code);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    insertComponent(e.target.value);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800">
      <select 
        className="p-2 rounded-md bg-white text-black" 
        value={selected} 
        onChange={handleSelectChange}
      >
        {components.map((comp) => (
          <option key={comp.label} value={comp.label}>{comp.label}</option>
        ))}
      </select>
      <button 
        onClick={copyToClipboard} 
        className="p-2 rounded-md bg-green-500 hover:bg-green-700 text-white"
      >
        Copy to Clipboard
      </button>
    </div>
  );
}
