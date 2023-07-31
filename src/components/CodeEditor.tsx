// components/CodeEditor.tsx
import React, { useEffect, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  setCode: (value: string) => void;
  theme: ThemeName;
}

export type ThemeName = 'Monokai' | 'SolarizedDark' | 'LightVisualStudio' | 'Abyss' | 'KimbieDark' | 'MonokaiDimmed' | 'Red' | 'SolarizedLight' | 'TomorrowNightBlue' | 'HighContrast' | 'DarkVisualStudio' | 'NightOwl';

export const themes: Record<ThemeName, any> = {
  'Monokai': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'F8F8F2', background: '272822' }],
    colors: { 'editor.foreground': '#F8F8F2', 'editor.background': '#272822' }
  },
  'SolarizedDark': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'D4D4D4', background: '1E1E1E' }],
    colors: { 'editor.foreground': '#D4D4D4', 'editor.background': '#1E1E1E' }
  },
  'LightVisualStudio': {
    base: 'vs',
    inherit: true,
    rules: [{ token: '', foreground: '333333', background: 'F3F3F3' }],
    colors: { 'editor.foreground': '#333333', 'editor.background': '#F3F3F3' }
  },
  'Abyss': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'FFFFFF', background: '000C18' }],
    colors: { 'editor.foreground': '#FFFFFF', 'editor.background': '#000C18' }
  },
  'KimbieDark': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'FFFFFF', background: '221A0F' }],
    colors: { 'editor.foreground': '#FFFFFF', 'editor.background': '#221A0F' }
  },
  'MonokaiDimmed': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'C9CACC', background: '1E1E1E' }],
    colors: { 'editor.foreground': '#C9CACC', 'editor.background': '#1E1E1E' }
  },
  'Red': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'FF0000', background: '1E1E1E' }],
    colors: { 'editor.foreground': '#FF0000', 'editor.background': '#1E1E1E' }
  },
  'SolarizedLight': {
    base: 'vs',
    inherit: true,
    rules: [{ token: '', foreground: '586E75', background: 'FDF6E3' }],
    colors: { 'editor.foreground': '#586E75', 'editor.background': '#FDF6E3' }
  },
  'TomorrowNightBlue': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'FFFFFF', background: '002451' }],
    colors: { 'editor.foreground': '#FFFFFF', 'editor.background': '#002451' }
  },
  'HighContrast': {
    base: 'hc-black',
    inherit: true,
    rules: [{ token: '', foreground: 'FFFFFF', background: '000000' }],
    colors: { 'editor.foreground': '#FFFFFF', 'editor.background': '#000000' }
  },
  'DarkVisualStudio': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'D4D4D4', background: '1E1E1E' }],
    colors: { 'editor.foreground': '#D4D4D4', 'editor.background': '#1E1E1E' }
  },
  'NightOwl': {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'D6DEEB', background: '011627' }],
    colors: { 'editor.foreground': '#D6DEEB', 'editor.background': '#011627' }
  },
};

export default function CodeEditor({ initialCode, setCode, theme }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Save the current cursor position
      const position = editorRef.current.getPosition();

      // Update the editor's value
      const model = editorRef.current.getModel();
      if (model) {
        model.setValue(initialCode);
      }

      // Restore the cursor position
      editorRef.current.setPosition(position);
      editorRef.current.focus();

      if (monacoRef.current) { // If monaco instance is available
        // Define the new theme
        monacoRef.current.editor.defineTheme('customTheme', themes[theme]);
        // Update the editor's theme
        editorRef.current.updateOptions({ theme: 'customTheme' });
      }
    }
  }, [initialCode, theme]);

  const definedThemes = new Set<ThemeName>();

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Define the theme if it hasn't been defined yet
    if (!definedThemes.has(theme)) {
      monaco.editor.defineTheme(theme, themes[theme]);
      definedThemes.add(theme);
    }

      // Disable validation
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
    
    // Set the initial theme
    editor.updateOptions({ theme });
  }


  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      setCode(value);
    }
  }

  return (
    <div>
      <Editor
        height="73vh"
        defaultLanguage="typescript"
        defaultValue={initialCode}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
}
