import { Target, Zap, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Pitch Perfect",
      description: "Craft compelling pitches that resonate with playlist curators",
      image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Quick Creation",
      description: "Create professional pitches in minutes, not hours",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "AI Enhancement",
      description: "Get AI suggestions to improve your pitch success rate",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-t from-background via-primary/5 to-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose DSTRO7</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
  );
};

export default Features;