import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, X, Check } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex p-6 border-b ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'default', 
  size = 'default', 
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10 p-0',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg m-4">
        <div className="bg-white rounded-lg shadow-lg border">
          {React.Children.map(children, child => 
            React.cloneElement(child, { onClose: () => onOpenChange(false) })
          )}
        </div>
      </div>
    </div>
  );
};

const DialogContent = ({ children, onClose }) => (
  <div className="p-6 space-y-4">
    <button 
      onClick={onClose} 
      className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
    {children}
  </div>
);

const DialogHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
    {children}
  </div>
);

const DialogTitle = ({ children }) => (
  <h2 className="text-lg font-semibold leading-none tracking-tight">
    {children}
  </h2>
);

const Input = ({ 
  placeholder, 
  type = 'text', 
  value, 
  onChange, 
  className = '' 
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

const Table = ({ children, className = '' }) => (
  <div className="w-full border rounded-md">
    <table className={`w-full ${className}`}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="[&_tr]:border-b">
    {children}
  </thead>
);

const TableBody = ({ children }) => (
  <tbody className="[&_tr:last-child]:border-0">
    {children}
  </tbody>
);

const TableHead = ({ children }) => (
  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
    {children}
  </th>
);

const TableRow = ({ children, className = '' }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
    {children}
  </tr>
);

const TableCell = ({ children, className = '' }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([
    {
      id: 'MP-001',
      name: 'Healthy Vegetarian',
      description: 'Balanced vegetarian meal plan',
      calories: 1800,
      dietPlan: 'Vegetarian',
      foods: [
        { name: 'Quinoa Salad', calories: 350, protein: 12, carbs: 45, fats: 15, allergens: ['Nuts'] },
        { name: 'Tofu Stir Fry', calories: 400, protein: 20, carbs: 30, fats: 22, allergens: ['Soy'] }
      ]
    },
    {
      id: 'MP-002',
      name: 'Keto Power Meals',
      description: 'High-fat, low-carb meal plan',
      calories: 2000,
      dietPlan: 'Keto',
      foods: [
        { name: 'Salmon with Avocado', calories: 500, protein: 25, carbs: 10, fats: 40, allergens: ['Fish'] }
      ]
    }
  ]);

  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [newMealPlan, setNewMealPlan] = useState({
    name: '',
    description: '',
    calories: '',
    dietPlan: ''
  });

  const getDietPlanColor = (plan) => {
    const colors = {
      'Keto': 'bg-blue-100 text-blue-800',
      'Vegetarian': 'bg-green-100 text-green-800',
      'Vegan': 'bg-yellow-100 text-yellow-800'
    };
    return colors[plan] || 'bg-gray-100 text-gray-800';
  };

  const handleCreateMealPlan = () => {
    const newPlan = {
      ...newMealPlan,
      id: `MP-${(mealPlans.length + 1).toString().padStart(3, '0')}`,
      foods: []
    };
    setMealPlans([...mealPlans, newPlan]);
    setIsCreatePlanOpen(false);
    setNewMealPlan({ name: '', description: '', calories: '', dietPlan: '' });
  };

  const handleDeleteMealPlan = (planId) => {
    setMealPlans(mealPlans.filter(plan => plan.id !== planId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Meal Plans</CardTitle>
          <Button onClick={() => setIsCreatePlanOpen(true)}>
            <PlusCircle className="mr-2" /> Add New Meal Plan
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Diet Plan</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mealPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.description}</TableCell>
                  <TableCell>{plan.calories}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDietPlanColor(plan.dietPlan)}`}>
                      {plan.dietPlan}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSelectedMealPlan(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDeleteMealPlan(plan.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog 
            open={selectedMealPlan !== null} 
            onOpenChange={() => setSelectedMealPlan(null)}
          >
            {selectedMealPlan && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedMealPlan.name} Details</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Meal Plan Info</h3>
                    <p><strong>Description:</strong> {selectedMealPlan.description}</p>
                    <p><strong>Total Calories:</strong> {selectedMealPlan.calories}</p>
                    <p><strong>Diet Plan:</strong> {selectedMealPlan.dietPlan}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Nutritional Breakdown</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Food</TableHead>
                          <TableHead>Calories</TableHead>
                          <TableHead>Protein</TableHead>
                          <TableHead>Carbs</TableHead>
                          <TableHead>Fats</TableHead>
                          <TableHead>Allergens</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedMealPlan.foods.map((food, index) => (
                          <TableRow key={index}>
                            <TableCell>{food.name}</TableCell>
                            <TableCell>{food.calories}</TableCell>
                            <TableCell>{food.protein}g</TableCell>
                            <TableCell>{food.carbs}g</TableCell>
                            <TableCell>{food.fats}g</TableCell>
                            <TableCell>
                              {food.allergens.map(allergen => (
                                <span 
                                  key={allergen} 
                                  className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-1"
                                >
                                  {allergen}
                                </span>
                              ))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>

          <Dialog 
            open={isCreatePlanOpen} 
            onOpenChange={setIsCreatePlanOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Meal Plan</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input 
                  placeholder="Meal Plan Name" 
                  value={newMealPlan.name}
                  onChange={(e) => setNewMealPlan({...newMealPlan, name: e.target.value})}
                />
                <Input 
                  placeholder="Description" 
                  value={newMealPlan.description}
                  onChange={(e) => setNewMealPlan({...newMealPlan, description: e.target.value})}
                />
                <Input 
                  placeholder="Total Calories" 
                  type="number"
                  value={newMealPlan.calories}
                  onChange={(e) => setNewMealPlan({...newMealPlan, calories: e.target.value})}
                />
                <Input 
                  placeholder="Diet Plan" 
                  value={newMealPlan.dietPlan}
                  onChange={(e) => setNewMealPlan({...newMealPlan, dietPlan: e.target.value})}
                />
                <Button onClick={handleCreateMealPlan}>
                  Create Meal Plan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlans;