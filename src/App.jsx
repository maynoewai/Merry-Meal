import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Dashboard from './components/dashboard/dashboard';
import OrderManagement from './components/order-mangement/order-mangement';
import DietPlans from './components/diet-plan/diet-plan';
import Inventory from './components/Inventory/inventory';
import Employees from './components/employee/employee';
import Donors from './components/donor/donor';
import FoodItemManagement from './components/food-item/food-item';
import MealPlans from './components/meal-page/meal-page';
import LoginRegistrationPage from './components/login/login';

const App = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Render Sidebar only if user is authenticated */}
        {isAuthenticated && (
          <Sidebar
            isMenuCollapsed={isMenuCollapsed}
            setIsMenuCollapsed={setIsMenuCollapsed}
          />
        )}
        <div className={isAuthenticated ? "flex-1 p-6 overflow-y-auto" : "w-full"}>
          <Routes>
            {isAuthenticated ? (
              <>
                {/* Protected Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<OrderManagement />} />
                <Route path="/meal-plans" element={<MealPlans />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/donors" element={<Donors />} />
                <Route path="/food-items" element={<FoodItemManagement />} />
                <Route path="/diet-plans" element={<DietPlans />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </>
            ) : (
              <>
                {/* Public Routes */}
                <Route
                  path="/login"
                  element={
                    <LoginRegistrationPage
                      onLoginSuccess={() => setIsAuthenticated(true)}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
