import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('');
    navigate('/pitch');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground">Login to DSTRO7</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Button type="submit" className="w-full neon-border hover-glow">
            Enter Development Mode
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;