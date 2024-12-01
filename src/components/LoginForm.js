import { useState } from 'react';
import { useRouter } from 'next/router';  // Import Router for navigation
import { login } from '../pages/api/user';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const data = await login(credentials);
      if (data?.email) {
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('email', data.email);
        localStorage.setItem('_id', data._id);

        if (data?.userType === 'farmer') {
          router.push('/requestMoney');
        } else {
          router.push('/allRequests');
        }
      }
      else{
        setErrorMessage('Login failed. Please check your credentials and try again.');  
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      
      {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>} {/* Show error message */}
      
      <input 
        name="email" 
        type="email" 
        value={credentials.email} 
        onChange={handleChange} 
        placeholder="Email" 
        className="p-2 border rounded" 
        required 
      />
      
      <input 
        name="password" 
        type="password" 
        value={credentials.password} 
        onChange={handleChange} 
        placeholder="Password" 
        className="p-2 border rounded" 
        required 
      />
      
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
