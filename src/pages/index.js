import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        {isRegistering ? <RegisterForm /> : <LoginForm />}
        <p className="mt-4 text-center">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsRegistering(!isRegistering)} className="ml-2 text-blue-500">
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
