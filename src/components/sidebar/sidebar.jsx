import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Utensils, 
  Warehouse, 
  Users, 
  HandCoins, 
  Cookie, 
  Salad, 
  Pizza, 
  Menu 
} from 'lucide-react';

// Custom Button Component
const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  onClick 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10 p-0'
  };

  return (
    <button
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Sidebar Component
const Sidebar = ({ isMenuCollapsed, setIsMenuCollapsed }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, path: '/dashboard' },
    { name: 'Orders', icon: <ShoppingCart />, path: '/orders' },
    { name: 'Meal Plans', icon: <Utensils />, path: '/meal-plans' },
    { name: 'Inventory', icon: <Warehouse />, path: '/inventory' },
    { name: 'Employees', icon: <Users />, path: '/employees' },
    { name: 'Donors', icon: <HandCoins />, path: '/donors' },
    { name: 'Food Items', icon: <Cookie />, path: '/food-items' },
    { name: 'Diet Plans', icon: <Salad />, path: '/diet-plans' },
  ];

  return (
    <div 
      className={`bg-white shadow-md transition-all duration-300 ${
        isMenuCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <img 
  className={`
    mx-auto w-20 h-20 object-contain rounded-full 
    transition-transform duration-300 ease-in-out 
    ${isMenuCollapsed ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
  `} 
  src="https://i.ibb.co/gDDy7pZ/Merry-Meal-1.png" 
  alt="Merry-Meal-Logo" 
/>
       
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
        >
          <Menu />
        </Button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mb-2 rounded-md ${
                isActive ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {item.icon}
            <span className={`ml-2 ${isMenuCollapsed ? 'hidden' : ''}`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

// Placeholder Components for Routing
const Dashboard = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Welcome to the Meal Project Dashboard</p>
  </div>
);

const OrderManagement = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Order Management</h1>
    <p>Manage and track your orders here</p>
  </div>
);

const MealPlans = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Meal Plans</h1>
    <p>Create and manage meal plans</p>
  </div>
);

const Inventory = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Inventory</h1>
    <p>Track and manage your inventory</p>
  </div>
);

const Employees = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Employees</h1>
    <p>Employee management and information</p>
  </div>
);

const Donors = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Donors</h1>
    <p>Manage donor information and contributions</p>
  </div>
);

const FoodItems = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Food Items</h1>
    <p>Manage and catalog food items</p>
  </div>
);

const DietPlans = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Diet Plans</h1>
    <p>Create and manage diet plans</p>
  </div>
);


export default Sidebar;

