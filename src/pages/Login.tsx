import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/pitch');
      }
    };
    
    checkSession();
  }, [navigate, isAuthenticated]);

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