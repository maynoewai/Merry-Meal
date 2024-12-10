import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  X 
} from 'lucide-react';

// Mock initial data - in a real application, this would come from an API
const initialFoodItems = [
  {
    id: 1,
    name: 'Grilled Chicken Salad',
    calories: 320,
    protein: 25,
    carbs: 15,
    fats: 12,
    allergens: ['Nuts', 'Dairy'],
    dietPlan: 'Keto',
    customizable: true
  },
  {
    id: 2,
    name: 'Vegetable Quinoa Bowl',
    calories: 280,
    protein: 12,
    carbs: 45,
    fats: 8,
    allergens: ['Gluten'],
    dietPlan: 'Vegan',
    customizable: false
  }
];

const FoodItemManagement = () => {
  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    allergens: [],
    dietPlan: '',
    customizable: false
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [filterDietPlan, setFilterDietPlan] = useState('');

  const allergenOptions = [
    'Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish'
  ];

  const dietPlans = [
    'Keto', 'Vegan', 'Vegetarian', 'Paleo', 'Mediterranean'
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.calories || isNaN(Number(formData.calories))) 
      errors.calories = 'Calories must be a number';
    if (!formData.dietPlan) errors.dietPlan = 'Diet Plan is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (currentItem) {
        // Update existing item
        setFoodItems(foodItems.map(item => 
          item.id === currentItem.id 
            ? {...formData, id: currentItem.id} 
            : item
        ));
      } else {
        // Add new item
        setFoodItems([
          ...foodItems, 
          {...formData, id: foodItems.length + 1}
        ]);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      allergens: [],
      dietPlan: '',
      customizable: false
    });
    setCurrentItem(null);
    setIsAddModalOpen(false);
    setValidationErrors({});
  };

  const handleDelete = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData(item);
    setIsAddModalOpen(true);
  };

  const filteredItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterDietPlan ? item.dietPlan === filterDietPlan : true)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Food Item Management</h1>
          <div className="flex space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Diet Plan Filter */}
            <div className="relative">
              <select
                value={filterDietPlan}
                onChange={(e) => setFilterDietPlan(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Diet Plans</option>
                {dietPlans.map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Add New Food Item Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="mr-2" /> Add Food Item
            </button>
          </div>
        </div>

        {/* Food Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Calories</th>
                <th className="p-4 text-left">Protein</th>
                <th className="p-4 text-left">Carbs</th>
                <th className="p-4 text-left">Fats</th>
                <th className="p-4 text-left">Diet Plan</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.calories} cal</td>
                  <td className="p-4">{item.protein}g</td>
                  <td className="p-4">{item.carbs}g</td>
                  <td className="p-4">{item.fats}g</td>
                  <td className="p-4">
                    <span className={`
                      px-2 py-1 rounded-full text-xs 
                      ${item.dietPlan === 'Keto' ? 'bg-blue-100 text-blue-800' : 
                        item.dietPlan === 'Vegan' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {item.dietPlan}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded-full"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Food Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {currentItem ? 'Edit Food Item' : 'Add New Food Item'}
              </h2>
              <button 
                onClick={resetForm}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full p-2 border rounded-md ${
                      validationErrors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                {/* Calories */}
                <div>
                  <label className="block mb-2">Calories</label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({...formData, calories: e.target.value})}
                    className={`w-full p-2 border rounded-md ${
                      validationErrors.calories ? 'border-red-500' : ''
                    }`}
                  />
                  {validationErrors.calories && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.calories}
                    </p>
                  )}
                </div>

                {/* Protein */}
                <div>
                  <label className="block mb-2">Protein (g)</label>
                  <input
                    type="number"
                    value={formData.protein}
                    onChange={(e) => setFormData({...formData, protein: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                {/* Carbs */}
                <div>
                  <label className="block mb-2">Carbs (g)</label>
                  <input
                    type="number"
                    value={formData.carbs}
                    onChange={(e) => setFormData({...formData, carbs: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                {/* Fats */}
                <div>
                  <label className="block mb-2">Fats (g)</label>
                  <input
                    type="number"
                    value={formData.fats}
                    onChange={(e) => setFormData({...formData, fats: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                {/* Diet Plan */}
                <div>
                  <label className="block mb-2">Diet Plan</label>
                  <select
                    value={formData.dietPlan}
                    onChange={(e) => setFormData({...formData, dietPlan: e.target.value})}
                    className={`w-full p-2 border rounded-md ${
                      validationErrors.dietPlan ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Select Diet Plan</option>
                    {dietPlans.map(plan => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                  {validationErrors.dietPlan && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.dietPlan}
                    </p>
                  )}
                </div>

                {/* Allergens */}
                <div>
                  <label className="block mb-2">Allergens</label>
                  <div className="flex flex-wrap gap-2">
                    {allergenOptions.map(allergen => (
                      <label key={allergen} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.allergens.includes(allergen)}
                          onChange={() => {
                            const currentAllergens = formData.allergens;
                            const newAllergens = currentAllergens.includes(allergen)
                              ? currentAllergens.filter(a => a !== allergen)
                              : [...currentAllergens, allergen];
                            setFormData({...formData, allergens: newAllergens});
                          }}
                          className="mr-2"
                        />
                        {allergen}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Customizable */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.customizable}
                    onChange={() => setFormData({...formData, customizable: !formData.customizable})}
                    className="mr-2"
                  />
                  <label>Customizable</label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {currentItem ? 'Update' : 'Add'} Food Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemManagement;