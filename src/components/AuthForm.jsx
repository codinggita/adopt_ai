import React from 'react';
import { Formik, Form } from 'formik';
import { Network, Activity } from 'lucide-react';
import Button from './Button.jsx';
import Input from './Input.jsx';
import { Link } from 'react-router-dom';

const AuthForm = ({ title, subtitle, initialValues, validationSchema, onSubmit, isRegister }) => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src="/bg.png" alt="AI Background" className="auth-left-bg" />
        <div className="auth-left-content">
          <div className="auth-logo">
            <Network />
            ADOPT AI
          </div>
          
          <div style={{ marginTop: 'auto', marginBottom: '4rem' }}>
            <h1 className="auth-tagline">
              Intelligence,<br/>
              Precision, <span>& Velocity.</span>
            </h1>
            <p className="auth-desc">
              Empowering performance marketers with high-density data and autonomous optimization engines. Experience effortless power without cognitive overload.
            </p>
            <div className="auth-status">
              <div className="auth-status-icon">
                <Activity size={18} />
              </div>
              <div className="auth-status-text">
                <h4>System Status</h4>
                <p>Engines Online & Optimal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <h2 className="auth-title">{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>

          <Button variant="google" icon={Activity}>
            Continue with Google
          </Button>

          <div className="auth-divider">OR</div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {isRegister && (
                  <Input 
                    label="Full Name" 
                    name="name" 
                    type="text" 
                    placeholder="John Doe" 
                  />
                )}
                <Input 
                  label="Email Address" 
                  name="email" 
                  type="email" 
                  placeholder="name@company.com" 
                />
                <Input 
                  label="Password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  link={!isRegister ? { text: 'Forgot password?', href: '#' } : null}
                />
                
                <Button type="submit" variant="primary">
                  {isRegister ? 'Create Account' : 'Sign In'} &rarr;
                </Button>
              </Form>
            )}
          </Formik>

          <div className="auth-footer">
            {isRegister ? "Already have an account?" : "Don't have an account?"} 
            <Link to={isRegister ? "/login" : "/register"}>
              {isRegister ? 'Sign In' : 'Request Access'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
