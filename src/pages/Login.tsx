import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    
    if (!success) {
      toast({
        variant: "destructive",
        title: "Incorrect password",
        description: "Please try again",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg border bg-card text-card-foreground shadow">
        <h1 className="text-2xl font-bold text-center">DSTRO7</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;