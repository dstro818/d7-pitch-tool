import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground">DSTRO7 Development Mode</h1>
        <Button 
          onClick={login} 
          className="w-full neon-border hover-glow"
        >
          Enter Development Mode
        </Button>
      </div>
    </div>
  );
};

export default Login;