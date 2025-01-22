import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  const ctaImage = "https://images.unsplash.com/photo-1598628461950-268968751a2e";

  return (
    <section className="py-16 bg-gradient-to-b from-background via-accent/5 to-background relative">
      <div className="absolute inset-0 -z-10 opacity-10">
        <img 
          src={ctaImage}
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
  );
};

export default CallToAction;