import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LogoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectToHome = () => {
      router.push('https://blueit-2.xangil.repl.co/');
    };

    const delay = 500;
    const redirectTimer = setTimeout(redirectToHome, delay);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default LogoutPage;