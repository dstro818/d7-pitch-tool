import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { PitchForm } from "./PitchTool/PitchForm";

const PitchTool = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="glass-card border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">DSTRO7 Pitch Tool</h1>
          <Button variant="ghost" onClick={logout} className="hover-glow">
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PitchForm />
        </motion.div>
      </div>
    </div>
  );
}

export default PitchTool;