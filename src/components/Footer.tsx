import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full px-6 py-8 bg-gray-900">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        {/* Logo and Copy */}
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="#" className="flex items-center">
            <Image height={100} width={100} className="h-12 w-auto rounded-2xl" src="/logo.jpg" alt="RainbowKit Playground" />
            <h2 className="text-2xl text-white font-bold ml-4">RainbowKit Playground</h2>
            </Link>
          <p className="mt-2 text-sm leading-5 text-white">
            © 2023 RainbowKit Playground. This site is not affiliated with Rainbow.
          </p>
        </div>

        {/* Resources */}
        <div className="mt-8 sm:mt-0 sm:col-span-1 lg:col-span-1">
          <h2 className="text-lg font-bold text-white mb-2">Resources</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="https://github.com/BankkRoll/rainbowkit-playground" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-white hover:text-gray-400">
                Github Repo
              </Link>
            </li>
            <li>
              <Link href="https://www.rainbowkit.com/docs/introduction" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-white hover:text-gray-400">
                RainbowKit Documentation
              </Link>
            </li>
            <li>
              <Link href="https://github.com/rainbow-me/rainbowkit" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-white hover:text-gray-400">
                RainbowKit GitHub
              </Link>
            </li>
          </ul>
        </div>

        {/* Author */}
        <div className="mt-8 sm:mt-0 sm:col-span-1 lg:col-span-1">
          <h2 className="text-lg font-bold text-white mb-2">Author</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="https://github.com/BankkRoll" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-white hover:text-gray-400">
                Bankk GitHub
              </a>
            </li>
            <li>
              <a href="https://twitter.com/bankkroll_eth" target="_blank" rel="noopener noreferrer" className="text-base leading-6 text-white hover:text-gray-400">
                Bankk Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
