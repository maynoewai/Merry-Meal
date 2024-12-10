import React, { useState } from 'react';
import { 
  ChevronRight as ChevronRightIcon, 
  Lock as LockIcon, 
  Mail as MailIcon, 
  User as UserIcon,
  Phone as PhoneIcon
} from 'lucide-react';
import {useNavigate } from 'react-router-dom';
// Custom Components to replace shadcn/ui components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-200 flex justify-center ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-2xl font-bold text-green-800 ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'default', 
  className = '', 
  onClick, 
  type = 'button',
  icon 
}) => {
  const baseStyles = 'flex items-center justify-center rounded-md px-4 py-2 transition-all duration-300';
  const variantStyles = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-green-600 text-green-600 hover:bg-green-50',
    link: 'text-green-600 hover:underline'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const Input = ({ 
  name, 
  type = 'text', 
  value, 
  onChange, 
  icon, 
  className = '',
  ...rest 
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${icon ? 'pl-10' : ''} focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
        {...rest}
      />
    </div>
  );
};

const LoginRegistrationPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    }
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[!@#$%^&*]/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (isLogin) {
      // Login validation
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    } else {
      // Registration validation
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be 8+ chars, include uppercase, number, and special char';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isLogin) {
    
            onLoginSuccess(); 
            navigate('/dashboard');
          }
    }
  };

  const Label = ({ children, className = '' }) => (
    <label className={`block text-gray-700 font-medium mb-2 ${className}`}>
      {children}
    </label>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">
          <img 
  className="mx-auto w-28 h-28 object-contain rounded-full hover:scale-110 transition-transform duration-300 ease-in-out" 
  src="https://i.ibb.co/gDDy7pZ/Merry-Meal-1.png" 
  alt="Merry-Meal-Logo" 
/> 
          </CardTitle>
        </CardHeader>
        <CardContent className="flex">
          {/* Left Image Section */}
          <div className="w-1/2 p-8 bg-green-100 flex items-center justify-center">
            <img 
              src="https://i.ibb.co/t3xdMpV/meal-image.png" 
              alt="Meal Preparation" 
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Form Section */}
          <div className="w-1/2 p-8">
            <div className="flex mb-6">
              <Button 
                variant={isLogin ? 'default' : 'outline'}
                className="mr-2"
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
              <Button 
                variant={!isLogin ? 'default' : 'outline'}
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>First Name</Label>
                    <Input 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      icon={<UserIcon />}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      icon={<UserIcon />}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <Label>Email</Label>
                <Input 
                  name="email" 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<MailIcon />}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <Label>Password</Label>
                <Input 
                  name="password" 
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={<LockIcon />}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="mb-4">
                    <Label>Confirm Password</Label>
                    <Input 
                      name="confirmPassword" 
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      icon={<LockIcon />}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <Label>Phone Number</Label>
                    <Input 
                      name="phoneNumber" 
                      value={formData.phoneNumber}
                      icon={<PhoneIcon />}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full mt-4"
                icon={<ChevronRightIcon />}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>

              {isLogin && (
                <div className="text-center mt-4 flex items-center justify-center">
                  Don't have an account? 
                  <Button 
                    variant="link" 
                    onClick={() => setIsLogin(false)}
                    className="text-green-600 ml-1"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginRegistrationPage;