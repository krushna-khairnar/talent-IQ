import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function Footer() {
  return (
    <footer className="w-full bg-base-100/80 backdrop-blur-md border-t border-primary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                <SparklesIcon className="size-6 text-white" />
              </div>
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Talent IQ
              </span>
            </div>

            <p className="text-sm text-base-content/70 leading-relaxed">
              A modern platform for remote technical interviews, real-time coding,
              and seamless collaboration.
            </p>
          </div>

          {/* PRODUCT */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base-content">Product</h4>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li className="hover:text-primary cursor-pointer transition-colors">Features</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Live Interviews</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Code Editor</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Video Calls</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base-content">Resources</h4>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li className="hover:text-primary cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Guides</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Support</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Community</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base-content">Get Started</h4>
            <p className="text-sm text-base-content/70">
              Start collaborating and crack your next technical interview.
            </p>

            <SignInButton mode="modal">
              <button className="btn btn-primary btn-sm w-fit">
                Start Coding
                <ArrowRightIcon className="size-4" />
              </button>
            </SignInButton>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-14 pt-6 border-t border-base-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-base-content/60">
            © {new Date().getFullYear()} Talent IQ. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-base-content/60">
            <span className="hover:text-primary cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-primary cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
