// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
    <Head>
      <title>Home | RainbowKit Playground</title>
      <meta name="author" content="Bankkroll" />
      <meta name="description" content="Interactively play with RainbowKit components" />
      <meta name="keywords" content="RainbowKit, Playground, Interactive, React Components" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://rainbowkit-playground.vercel.app" />
      <meta property="og:title" content="RainbowKit Playground" />
      <meta property="og:description" content="Interactively play with RainbowKit components" />
      <meta property="og:image" content="https://rainbowkit-playground.vercel.app/logo.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://rainbowkit-playground.vercel.app" />
      <meta property="twitter:title" content="RainbowKit Playground" />
      <meta property="twitter:description" content="Interactively play with RainbowKit components" />
      <meta property="twitter:image" content="https://rainbowkit-playground.vercel.app/logo.jpg" />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content="RainbowKit Playground" />
      <meta itemProp="description" content="Interactively play with RainbowKit components" />
      <meta itemProp="image" content="https://rainbowkit-playground.vercel.app/logo.jpg" />
      <meta itemProp="url" content="https://rainbowkit-playground.vercel.app" />
      <meta itemProp="author" content="Bankkroll" />
    </Head>
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x">
      <div className="absolute w-full h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mix-blend-multiply animate-gradient-x" />
      <div className="relative z-10 max-w-2xl px-6 py-8 bg-white shadow-2xl rounded-xl space-y-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to RainbowKit Playground</h1>
        <p className="text-lg text-gray-600">This is a live coding environment where you can experiment with the different features of RainbowKit in real-time. Select components, tweak their properties, and see the results as you code!</p>
        <div className="grid gap-6 md:grid-cols-2 pb-10">
          {["Live Code Editor", "Component Configurator", "Code Exporter", "Theme and Accent Color Switcher", "Authentication Simulator", "Recent Transactions Manager"].map(feature => (
            <div key={feature} className="flex items-start space-x-2">
              <span className="inline-block w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-xs font-bold">{feature[0]}</span>
              <p className="text-gray-600">{feature}</p>
            </div>
          ))}
        </div>
        <Link href="/live-code-editor">
          <p className="block w-full py-3 text-center rounded-lg shadow-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white uppercase tracking-wider font-semibold text-sm sm:text-base cursor-pointer hover:opacity-90 transition duration-300">Start Live Coding</p>
        </Link>
      </div>
    </div>
    </>
  );
}
