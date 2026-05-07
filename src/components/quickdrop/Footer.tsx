import { motion } from "framer-motion";
import { Github, Twitter, Mail, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="mb-4 font-display gradient-text">QuickDrop</h3>
            <p className="text-muted-foreground text-sm">
              Share files instantly. Stay secure. Stay private.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display">Connect</h4>
            <div className="flex gap-4">
              <SocialLink icon={<Github className="w-5 h-5" />} href="https://github.com/KhawajaAbdulMoiz/" />
              <SocialLink icon={<Twitter className="w-5 h-5" />} href="https://x.com/devabdulmoiz" />
              <SocialLink icon={<Mail className="w-5 h-5" />} href="mailto:contactabdulmoiz2005@gmail.com" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap justify-center">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
              <span>by</span>
              <a
                href="https://www.linkedin.com/in/khawaja-abdul-moiz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors flex items-center gap-1 font-medium"
              >
                Khawaja Abdul Moiz
                <Linkedin className="w-4 h-4" />
              </a>
              <span>&</span>
              <a
                href="https://www.linkedin.com/in/faraz-ahmed-612000307"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors flex items-center gap-1 font-medium"
              >
                Faraz Ahmed
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 QuickDrop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  );
}