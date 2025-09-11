import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="ReplySystem"
                width={200}
                height={33}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              Managed Support. Customized for Every Client.
            </p>
            <div className="flex space-x-6">
              {/* Add social media links here if needed */}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/demo" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Demo
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Account</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/login" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Start Free Trial
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Join Team
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Contact</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="mailto:support@replysystem.com" className="text-sm leading-6 text-gray-300 hover:text-white">
                      support@replysystem.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+1234567890" className="text-sm leading-6 text-gray-300 hover:text-white">
                      +1 (XXX) XXX-XXXX
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} ReplySystem.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


