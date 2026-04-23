import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthForm from '../components/AuthForm.jsx';
import { registerSchema } from '../utils/validation.js';
import authService from '../services/authService.js';
import { setToken, setUser } from '../utils/storage.js';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await authService.register(values);
      setToken(data.token);
      setUser({ id: data._id, name: data.name, email: data.email });
      toast.success(`Account created successfully! Welcome, ${data.name}.`);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Create an account"
      subtitle="Join AdOpt AI to start optimizing your campaigns."
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
      isRegister={true}
    />
  );
};

export default Register;
