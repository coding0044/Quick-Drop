import { useState } from "react";
import { Navbar } from "@/components/quickdrop/Navbar";
import { HeroSection } from "@/components/quickdrop/HeroSection";
import { UploadCard } from "@/components/quickdrop/UploadCard";
import { HowItWorks } from "@/components/quickdrop/HowItWorks";
import { UniqueFeatures } from "@/components/quickdrop/UniqueFeatures";
import { Footer } from "@/components/quickdrop/Footer";
import { motion } from "framer-motion";

const Index = () => {
  const [activeTab, setActiveTab] = useState("landing");

  const handleGetStarted = () => {
    setActiveTab("upload");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-16">
        {activeTab === "landing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection onGetStarted={handleGetStarted} />
            <HowItWorks />
            <UniqueFeatures />
          </motion.div>
        )}

        {activeTab === "upload" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-display mb-4">
                  Share Your <span className="gradient-text">Files & Text</span>
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Upload files or paste text to generate a shareable link instantly. 
                  No account required.
                </p>
              </div>
              <UploadCard />
            </div>
          </motion.div>
        )}

        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-20"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-display mb-4">
                  About <span className="gradient-text">QuickDrop</span>
                </h1>
              </div>
              
              <div className="glass rounded-2xl p-8 border border-border shadow-large">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    QuickDrop was built with a simple mission: make file and text sharing as 
                    effortless as possible while maintaining privacy and security.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Whether you're a student sharing assignments, a developer sharing code snippets, 
                    or anyone who needs to quickly transfer files or text, QuickDrop has you covered.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-secondary rounded-xl p-6 text-center">
                      <div className="text-3xl font-display font-bold gradient-text mb-2">100%</div>
                      <div className="text-sm text-muted-foreground">Free to Use</div>
                    </div>
                    <div className="bg-secondary rounded-xl p-6 text-center">
                      <div className="text-3xl font-display font-bold gradient-text mb-2">0</div>
                      <div className="text-sm text-muted-foreground">Registration Required</div>
                    </div>
                    <div className="bg-secondary rounded-xl p-6 text-center">
                      <div className="text-3xl font-display font-bold gradient-text mb-2">∞</div>
                      <div className="text-sm text-muted-foreground">Possibilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;