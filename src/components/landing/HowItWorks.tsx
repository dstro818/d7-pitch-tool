import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    { step: "1", title: "Request Access", description: "DSTRO7 will provide you credentials" },
    { step: "2", title: "Add Your Track", description: "Input your song details" },
    { step: "3", title: "Craft Your Pitch", description: "Use our AI-powered tools" },
    { step: "4", title: "Save & Export", description: "Copy Text or Export Pitch to PDF" }
  ];

  return (
    <section className="py-16 bg-gradient-to-tr from-background via-primary/5 to-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
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
  );
};

export default HowItWorks;