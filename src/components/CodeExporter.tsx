// components/CodeExporter.tsx
export default function CodeExporter({ code }: { code: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button 
      onClick={copyToClipboard} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Copy to Clipboard
    </button>
  );
}
