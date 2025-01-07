import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/pitch');
    } else {
      toast({
        title: "Authentication Error",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground">Login to DSTRO7</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 text-white placeholder:text-gray-400 border-white/10"
            />
          </div>
          <Button type="submit" className="w-full neon-border hover-glow">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;