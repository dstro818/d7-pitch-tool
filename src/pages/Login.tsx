import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/pitch');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/pitch`
        }
      });

      if (error) {
        toast.error('Failed to login. Please try again.');
        console.error('Login error:', error);
        return;
      }

      if (data) {
        login();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground">DSTRO7 Development Mode</h1>
        <Button 
          onClick={handleLogin} 
          className="w-full neon-border hover-glow"
        >
          Enter Development Mode
        </Button>
      </div>
    </div>
  );
};

export default Login;