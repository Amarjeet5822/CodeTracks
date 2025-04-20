import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterPage = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container px-4 py-6 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">CodeTracks</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitor your GitHub repositories, track contributions, and analyze repository health in one place.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex mt-2 space-x-4">
              <Link href="#" aria-label="GitHub" className="hover:text-primary transition-colors">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-6 mt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CodeTracks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;