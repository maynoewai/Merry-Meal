import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Info, 
  Filter 
} from 'lucide-react';

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 'INV-001',
      name: 'Chicken Breast',
      quantity: 50,
      unit: 'kg',
      category: 'Frozen',
      lastUpdated: '2024-03-15'
    },
    {
      id: 'INV-002',
      name: 'Rice',
      quantity: 20,
      unit: 'kg',
      category: 'Dry Goods',
      lastUpdated: '2024-03-10'
    },
    {
      id: 'INV-003',
      name: 'Tomato Sauce',
      quantity: 5,
      unit: 'liters',
      category: 'Refrigerated',
      lastUpdated: '2024-03-12'
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    category: 'Dry Goods'
  });

  const categories = ['All', 'Frozen', 'Dry Goods', 'Refrigerated', 'Produce'];

  const filteredItems = inventoryItems.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    const newInventoryItem = {
      id: `INV-${(inventoryItems.length + 1).toString().padStart(3, '0')}`,
      ...newItem,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setInventoryItems([...inventoryItems, newInventoryItem]);
    setIsAddItemModalOpen(false);
    setNewItem({
      name: '',
      quantity: '',
      unit: 'kg',
      category: 'Dry Goods'
    });
  };

  const handleDeleteItem = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Page Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Inventory Management</h2>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search Inventory" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="h-5 w-5" />
              </div>
            </div>

            {/* Add Inventory Item Button */}
            <button 
              onClick={() => setIsAddItemModalOpen(true)}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Item
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Item Name', 'Quantity', 'Unit', 'Category', 'Last Updated', 'Actions'].map((header) => (
                  <th 
                    key={header} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className={`
                  ${item.quantity <= 10 ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}
                `}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                    {item.quantity <= 10 && (
                      <span 
                        className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full"
                        title="Low Stock"
                      >
                        Low Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`
                      px-2 py-1 rounded-full text-xs 
                      ${item.category === 'Frozen' ? 'bg-blue-100 text-blue-800' : 
                        item.category === 'Dry Goods' ? 'bg-green-100 text-green-800' : 
                        item.category === 'Refrigerated' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition-colors"
                      title="Edit Item"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                      title="Delete Item"
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

      {/* Add Inventory Item Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Inventory Item</h3>
              <button 
                onClick={() => setIsAddItemModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input 
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                >
                  <option value="kg">kg</option>
                  <option value="liters">Liters</option>
                  <option value="pieces">Pieces</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                >
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button 
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Info Icon */}
      <div className="fixed bottom-4 right-4">
        <button 
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          title="Inventory Categories Info"
        >
          <Info className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default InventoryManagement;