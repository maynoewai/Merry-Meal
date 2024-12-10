import React, { useState } from 'react';
import { 
  PlusCircle, 
  Filter, 
  Eye, 
  Edit, 
  Trash2 
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
  <div className={`flex justify-center items-center w-full ${className}`}>
    {children}
  </div>
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
    outline: 'border border-gray-300 bg-white hover:bg-gray-100',
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

// Custom Dialog Component
const Dialog = ({ open, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = useState(open || false);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
    onOpenChange && onOpenChange(newOpen);
  };

  return (
    <div className="relative">
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          isOpen, 
          onOpenChange: handleOpenChange 
        })
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {React.Children.map(children, child => 
              child.type.name === 'DialogContent' 
                ? React.cloneElement(child, { 
                    onClose: () => handleOpenChange(false) 
                  }) 
                : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Dialog Trigger Component
const DialogTrigger = ({ children, isOpen, onOpenChange }) => {
  return React.cloneElement(children, {
    onClick: () => onOpenChange(true)
  });
};

// Dialog Content Component
const DialogContent = ({ children, onClose }) => (
  <div>
    <div className="flex justify-end mb-4">
      <Button variant="ghost" size="icon" onClick={onClose}>
        X
      </Button>
    </div>
    {children}
  </div>
);

// Dialog Header Component
const DialogHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

// Dialog Title Component
const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

// Custom Select Component
const Select = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <div className="relative">
      <div 
        className="border rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || 'Select an option'}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg">
          {React.Children.map(children, child => 
            React.cloneElement(child, { 
              onSelect: (value) => {
                setSelectedValue(value);
                setIsOpen(false);
              }
            })
          )}
        </div>
      )}
    </div>
  );
};

// Select Trigger Component
const SelectTrigger = ({ children }) => children;

// Select Value Component
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;

// Select Content Component
const SelectContent = ({ children, onSelect }) => (
  <div>
    {React.Children.map(children, child => 
      React.cloneElement(child, { onSelect })
    )}
  </div>
);

// Select Item Component
const SelectItem = ({ children, value, onSelect }) => (
  <div 
    className="p-2 hover:bg-gray-100 cursor-pointer"
    onClick={() => onSelect(value)}
  >
    {children}
  </div>
);

// Custom Input Component
const Input = ({ placeholder, className = '' }) => (
  <input 
    placeholder={placeholder} 
    className={`border rounded-md p-2 w-full ${className}`}
  />
);

// Custom Checkbox Component
const Checkbox = ({ checked, onCheckedChange }) => (
  <input 
    type="checkbox" 
    checked={checked} 
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="form-checkbox h-5 w-5 text-blue-600"
  />
);

const DietPlans = () => {
  const [dietPlans, setDietPlans] = useState([
    {
      id: 'DP-001',
      name: 'Keto Diet',
      description: 'Low-carb, high-fat diet',
      healthGoals: ['Weight Loss', 'Metabolic Health'],
      restrictions: ['No Grains', 'Low Carbohydrates']
    },
    {
      id: 'DP-002',
      name: 'Vegan Diet',
      description: 'Plant-based nutrition plan',
      healthGoals: ['Heart Health', 'Sustainable Living'],
      restrictions: ['No Animal Products']
    }
  ]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  const filterOptions = [
    'Weight Loss', 'Heart Health', 'Metabolic Health', 
    'Muscle Gain', 'Sustainable Living'
  ];

  const filteredPlans = dietPlans.filter(plan => 
    filters.length === 0 || 
    filters.some(filter => 
      plan.healthGoals.includes(filter) || 
      plan.restrictions.includes(filter)
    )
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              <div className="max-w-full flex justify-center items-center">
                <img
                  src="https://i.ibb.co/GVFywgJ/meal-planning-clipboard-food-arrangement-1.jpg"
                  alt="meal-planning-clipboard-food-arrangement-1"
                  className="max-w-full h-auto object-contain"
                  style={{ maxHeight: '350px', maxWidth: '600px' }}
                />
              </div>
            </CardTitle>
            <div className="flex space-x-4">
              <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2" /> Create Diet Plan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Diet Plan</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input placeholder="Diet Plan Name" />
                    <Input placeholder="Description" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Health Goals" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.map(goal => (
                          <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Restrictions" />
                    <Button>Create Plan</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2" /> Filters
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Diet Plans</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    {filterOptions.map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters([...filters, option]);
                            } else {
                              setFilters(filters.filter(f => f !== option));
                            }
                          }}
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <strong>Health Goals:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {plan.healthGoals.map(goal => (
                        <span 
                          key={goal} 
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Restrictions:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {plan.restrictions.map(restriction => (
                        <span 
                          key={restriction} 
                          className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                        >
                          {restriction}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t flex justify-end space-x-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DietPlans;