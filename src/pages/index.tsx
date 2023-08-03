// pages/index.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

// Define your feature list
const features = [
  "Live Code Editor",
  "Component Configurator",
  "Theme and Accent Color Switcher",
  "Authentication Simulator",
];

// Define animation variants
const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | RainbowKit Playground</title>
        <meta name="author" content="Bankkroll" />
        <meta
          name="description"
          content="Interactively play with RainbowKit components"
        />
        <meta
          name="keywords"
          content="RainbowKit, Playground, Interactive, React Components"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://rainbowkit-playground.vercel.app"
        />
        <meta property="og:title" content="RainbowKit Playground" />
        <meta
          property="og:description"
          content="Interactively play with RainbowKit components"
        />
        <meta
          property="og:image"
          content="https://rainbowkit-playground.vercel.app/logo.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://rainbowkit-playground.vercel.app"
        />
        <meta property="twitter:title" content="RainbowKit Playground" />
        <meta
          property="twitter:description"
          content="Interactively play with RainbowKit components"
        />
        <meta
          property="twitter:image"
          content="https://rainbowkit-playground.vercel.app/logo.jpg"
        />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="RainbowKit Playground" />
        <meta
          itemProp="description"
          content="Interactively play with RainbowKit components"
        />
        <meta
          itemProp="image"
          content="https://rainbowkit-playground.vercel.app/logo.jpg"
        />
        <meta
          itemProp="url"
          content="https://rainbowkit-playground.vercel.app"
        />
        <meta itemProp="author" content="Bankkroll" />
      </Head>
      <div className="relative min-h-screen bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-6 py-8 mt-10">
          <motion.h1
            className="text-4xl font-bold text-white text-center"
            initial="hidden"
            animate="show"
            variants={variants}
          >
            Welcome to RainbowKit Playground
          </motion.h1>

          <motion.p
            className="text-lg text-white text-center mt-4 max-w-lg mx-auto"
            initial="hidden"
            animate="show"
            variants={variants}
          >
            This is a live coding environment where you can experiment with the
            different features of RainbowKit in real-time. Select components,
            tweak their properties, and see the results as you code!
          </motion.p>

          <motion.div
            className="max-w-2xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8"
            initial="hidden"
            animate="show"
            variants={variants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex flex-col items-center justify-center p-6 bg-blue-800 rounded-lg shadow-lg"
                variants={childVariants}
              >
                <span className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-2xl font-bold">
                  {feature[0]}
                </span>
                <p className="text-white">{feature}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <Link href="/live-code-editor">
              <motion.p
                className="block py-3 px-8 rounded-lg shadow-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white uppercase tracking-wider font-semibold text-sm sm:text-base cursor-pointer hover:opacity-90 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Editor ➞
              </motion.p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
