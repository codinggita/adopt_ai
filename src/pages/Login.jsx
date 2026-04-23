import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthForm from '../components/AuthForm.jsx';
import { loginSchema } from '../utils/validation.js';
import authService from '../services/authService.js';
import { setToken, setUser } from '../utils/storage.js';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await authService.login(values);
      setToken(data.token);
      setUser({ id: data._id, name: data.name, email: data.email });
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Log in to your workspace to continue optimizing."
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
      isRegister={false}
    />
  );
};

export default Login;
