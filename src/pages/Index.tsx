import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Music, 
  Target, 
  Zap, 
  MessageSquare, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Craft Perfect Playlist Pitches Online
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Get Your Music Featured on More Playlists – Faster and Easier Than Ever!
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Start Pitching for $1
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DSTRO7</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-primary" />,
                title: "Smart Targeting",
                description: "AI-powered playlist matching for better acceptance rates"
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Quick Creation",
                description: "Create professional pitches in minutes, not hours"
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-primary" />,
                title: "AI Enhancement",
                description: "Get AI suggestions to improve your pitch success rate"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg shadow-lg bg-white"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Featured?</h2>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Start Pitching Now
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Create Account", description: "Sign up in seconds" },
              { step: "2", title: "Add Your Track", description: "Input your song details" },
              { step: "3", title: "Craft Your Pitch", description: "Use our AI-powered tools" },
              { step: "4", title: "Submit & Track", description: "Monitor your success" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;