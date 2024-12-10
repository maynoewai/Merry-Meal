import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      name: 'Sarah Johnson',
      role: 'Meal Delivery Coordinator',
      department: 'Operations',
      status: 'Active',
      hireDate: '2023-06-15'
    },
    {
      id: 'EMP-002',
      name: 'Michael Chen',
      role: 'Kitchen Manager',
      department: 'Food Preparation',
      status: 'Active',
      hireDate: '2022-11-20'
    },
    {
      id: 'EMP-003',
      name: 'Elena Rodriguez',
      role: 'Volunteer Coordinator',
      department: 'Community Engagement',
      status: 'On Leave',
      hireDate: '2024-01-10'
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEmployeeDetailsOpen, setIsEmployeeDetailsOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);

  const filteredEmployees = employees.filter(employee => 
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeDelete = (employeeId) => {
    setEmployees(employees.filter(employee => employee.id !== employeeId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Employee Management</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search Employees" 
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
                {['Employee ID', 'Name', 'Role', 'Department', 'Status', 'Actions'].map((header) => (
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
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 rounded-full text-xs 
                      ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}
                    `}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    {/* View Employee Details */}
                    <button 
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setIsEmployeeDetailsOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>

                    {/* Edit Employee */}
                    <button 
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setIsEditEmployeeOpen(true);
                      }}
                      className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-100 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>

                    {/* Delete Employee */}
                    <button 
                      onClick={() => handleEmployeeDelete(employee.id)}
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
            Showing {filteredEmployees.length} of {employees.length} employees
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

      {/* Employee Details Modal */}
      {isEmployeeDetailsOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Employee Details: {selectedEmployee.id}</h3>
              <button 
                onClick={() => setIsEmployeeDetailsOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Role:</strong> {selectedEmployee.role}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Status:</strong> {selectedEmployee.status}</p>
              <p><strong>Hire Date:</strong> {selectedEmployee.hireDate}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditEmployeeOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Employee Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  defaultValue={selectedEmployee.name}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input 
                  type="text" 
                  defaultValue={selectedEmployee.role}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  defaultValue={selectedEmployee.status}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setIsEditEmployeeOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsEditEmployeeOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;