import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([
    {
      id: 'MP-001',
      userName: 'John Doe',
      mealPlan: 'Vegetarian',
      status: 'Cooking',
      date: '2024-03-15'
    },
    {
      id: 'MP-002',
      userName: 'Jane Smith',
      mealPlan: 'Keto',
      status: 'Dispatched',
      date: '2024-03-16'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdateOrder, setStatusUpdateOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = (newStatus) => {
    if (statusUpdateOrder) {
      setOrders(orders.map(order => 
        order.id === statusUpdateOrder.id 
          ? {...order, status: newStatus} 
          : order
      ));
      setStatusUpdateOrder(null);
      setIsStatusUpdateOpen(false);
    }
  };

  const handleOrderDelete = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Order Management</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search Orders" 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Order ID', 'User Name', 'Meal Plan', 'Status', 'Actions'].map((header) => (
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
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.mealPlan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 rounded-full text-xs 
                      ${order.status === 'Cooking' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'Dispatched' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    {/* View Order Details */}
                    <button 
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsOrderDetailsOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>

                    {/* Update Order Status */}
                    <button 
                      onClick={() => {
                        setStatusUpdateOrder(order);
                        setIsStatusUpdateOpen(true);
                      }}
                      className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-100 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>

                    {/* Delete Order */}
                    <button 
                      onClick={() => handleOrderDelete(order.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
          <div className="flex space-x-2">
            <button 
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {isOrderDetailsOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details: {selectedOrder.id}</h3>
              <button 
                onClick={() => setIsOrderDetailsOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <p><strong>User:</strong> {selectedOrder.userName}</p>
              <p><strong>Meal Plan:</strong> {selectedOrder.mealPlan}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {isStatusUpdateOpen && statusUpdateOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
            <div className="space-y-4">
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                defaultValue={statusUpdateOrder.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
              >
                <option value="Cooking">Cooking</option>
                <option value="In Progress">In Progress</option>
                <option value="Dispatched">Dispatched</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setIsStatusUpdateOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleStatusUpdate(
                    document.querySelector('select').value
                  )}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;