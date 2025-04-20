
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04";

  return (
    <section className="container mx-auto px-6 py-16 text-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="relative">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img 
            src={heroImage}
            alt="Background"
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI-Powered Playlist Pitching</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            DSTRO7: Your Professional Playlist Pitch Partner
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-muted-foreground">
            Elevate Your Music's Reach with Expert Playlist Pitching Solutions, Trained on Thousands of Successful Submissions
          </p>
          <p className="text-lg mb-8 text-muted-foreground">
            Our AI analyzes successful playlist placements to craft personalized, compelling pitches that resonate with curators
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="neon-border hover-glow bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Start Pitching Now
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-5 h-5 text-primary" />
              <span>Trained on 10,000+ successful pitches</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
