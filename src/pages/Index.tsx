import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Music, 
  Target, 
  Zap, 
  MessageSquare, 
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="relative">
          {/* Background image with overlay */}
          <div className="absolute inset-0 -z-10 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
              DSTRO7: Your Professional Playlist Pitch Partner
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Elevate Your Music's Reach with Expert Playlist Pitching Solutions
            </p>
            <Link to="/login">
              <Button size="lg" className="neon-border hover-glow bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Start Pitching Now
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-t from-background via-primary/5 to-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose DSTRO7</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-primary" />,
                title: "Pitch Perfect",
                description: "Craft compelling pitches that resonate with playlist curators",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Quick Creation",
                description: "Create professional pitches in minutes, not hours",
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-primary" />,
                title: "AI Enhancement",
                description: "Get AI suggestions to improve your pitch success rate",
                image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-6 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-background via-accent/5 to-background relative">
        <div className="absolute inset-0 -z-10 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Ready to Get Featured?</h2>
          <Link to="/login">
            <Button size="lg" className="neon-border hover-glow bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Start Pitching Now
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-tr from-background via-primary/5 to-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Request Access", description: "DSTRO7 will provide you credentials" },
              { step: "2", title: "Add Your Track", description: "Input your song details" },
              { step: "3", title: "Craft Your Pitch", description: "Use our AI-powered tools" },
              { step: "4", title: "Save & Export", description: "Copy Text or Export Pitch to PDF" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center glass-card p-6 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;