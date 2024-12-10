import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Utensils, 
  Warehouse, 
  Users, 
  DollarSign, 
  Menu, 
  Bell, 
  UserCircle2, 
  PlusCircle 
} from 'lucide-react';

// Custom Card Component
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

// Custom CardHeader Component
const CardHeader = ({ children, className = '' }) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

// Custom CardTitle Component
const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>
    {children}
  </h3>
);

// Custom CardContent Component
const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

// Custom Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default', 
  className = '', 
  onClick,
  ...props 
}) => {
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100',
  };

  const sizeStyles = {
    default: 'px-4 py-2',
    icon: 'p-2',
  };

  return (
    <button
      className={`
        flex items-center justify-center 
        rounded-md 
        transition-all duration-300 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Calendar Component (Simplified)
const Calendar = ({ mode = 'single', className = '' }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(
    selectedDate.getFullYear(), 
    selectedDate.getMonth() + 1, 
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(), 
    selectedDate.getMonth(), 
    1
  ).getDay();

  return (
    <div className={`calendar bg-white p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon">
          {'<'}
        </Button>
        <h2 className="text-lg font-semibold">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button variant="ghost" size="icon">
          {'>'}
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs text-gray-500">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <div 
            key={i + 1} 
            className={`
              p-2 
              ${i + 1 === selectedDate.getDate() 
                ? 'bg-blue-500 text-white rounded-full' 
                : 'hover:bg-gray-100 cursor-pointer'}
            `}
            onClick={() => {
              if (mode === 'single') {
                setSelectedDate(new Date(
                  selectedDate.getFullYear(), 
                  selectedDate.getMonth(), 
                  i + 1
                ));
              }
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const quickStats = [
    { 
      title: 'Orders in Progress', 
      value: 24, 
      icon: <ShoppingBag className="text-blue-500" /> 
    },
    { 
      title: 'Meals Dispatched', 
      value: 156, 
      icon: <Utensils className="text-green-500" /> 
    },
    { 
      title: 'Donations Received', 
      value: '$12,540', 
      icon: <DollarSign className="text-yellow-500" /> 
    },
    { 
      title: 'Low Inventory Items', 
      value: 5, 
      icon: <Warehouse className="text-red-500" /> 
    }
  ];

  const notifications = [
    { 
      id: 1, 
      message: 'Low Inventory: Rice (10 kg remaining)', 
      type: 'warning' 
    },
    { 
      id: 2, 
      message: 'New Order #1254 Created', 
      type: 'info' 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Navbar */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon">
                <UserCircle2 />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Calendar Section */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" />
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.map((notify) => (
                <div 
                  key={notify.id} 
                  className={`p-3 mb-2 rounded-md ${
                    notify.type === 'warning' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {notify.message}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Floating Action Button */}
        <Button 
          className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg"
          size="icon"
        >
          <PlusCircle size={32} />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;