import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  BarChart2 
} from 'lucide-react';

const DonorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContributionType, setSelectedContributionType] = useState('All');
  const [isAddDonorModalOpen, setIsAddDonorModalOpen] = useState(false);
  const [donors, setDonors] = useState([
    {
      id: 'DNR-001',
      name: 'John Smith',
      contributionAmount: 5000,
      contributionType: 'Money',
      dateOfContribution: '2024-02-15'
    },
    {
      id: 'DNR-002',
      name: 'Green Food Bank',
      contributionAmount: 500,
      contributionType: 'Food',
      dateOfContribution: '2024-03-10'
    },
    {
      id: 'DNR-003',
      name: 'Emily Johnson',
      contributionAmount: 2500,
      contributionType: 'Money',
      dateOfContribution: '2024-01-20'
    }
  ]);

  const [newDonor, setNewDonor] = useState({
    name: '',
    contributionAmount: '',
    contributionType: 'Money',
    dateOfContribution: new Date().toISOString().split('T')[0]
  });

  const contributionTypes = ['All', 'Money', 'Food'];

  const filteredDonors = donors.filter(donor => 
    (selectedContributionType === 'All' || donor.contributionType === selectedContributionType) &&
    (donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     donor.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const calculateTotalContributions = () => {
    return donors.reduce((total, donor) => total + donor.contributionAmount, 0);
  };

  const calculateContributionsByType = () => {
    return donors.reduce((acc, donor) => {
      acc[donor.contributionType] = (acc[donor.contributionType] || 0) + donor.contributionAmount;
      return acc;
    }, {});
  };

  const handleAddDonor = () => {
    if (!newDonor.name || !newDonor.contributionAmount) {
      alert('Please fill in all required fields');
      return;
    }

    const newDonorEntry = {
      id: `DNR-${(donors.length + 1).toString().padStart(3, '0')}`,
      ...newDonor,
      contributionAmount: parseFloat(newDonor.contributionAmount)
    };

    setDonors([...donors, newDonorEntry]);
    setIsAddDonorModalOpen(false);
    setNewDonor({
      name: '',
      contributionAmount: '',
      contributionType: 'Money',
      dateOfContribution: new Date().toISOString().split('T')[0]
    });
  };

  const handleDeleteDonor = (id) => {
    setDonors(donors.filter(donor => donor.id !== id));
  };

  const totalContributions = calculateTotalContributions();
  const contributionsByType = calculateContributionsByType();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Page Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Donor Management</h2>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search Donors" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Contribution Type Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedContributionType}
                onChange={(e) => setSelectedContributionType(e.target.value)}
              >
                {contributionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <BarChart2 className="h-5 w-5" />
              </div>
            </div>

            {/* Add Donor Button */}
            <button 
              onClick={() => setIsAddDonorModalOpen(true)}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Donor
            </button>
          </div>
        </div>

        {/* Contributions Overview */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Contributions</h3>
            <p className="text-2xl font-bold text-green-600">${totalContributions.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Money Contributions</h3>
            <p className="text-xl font-bold text-blue-600">${contributionsByType['Money']?.toLocaleString() || '0'}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Food Contributions</h3>
            <p className="text-xl font-bold text-orange-600">${contributionsByType['Food']?.toLocaleString() || '0'}</p>
          </div>
        </div>

        {/* Donors Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Donor Name', 'Contribution Amount', 'Type', 'Date', 'Actions'].map((header) => (
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
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {donor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${donor.contributionAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`
                      px-2 py-1 rounded-full text-xs 
                      ${donor.contributionType === 'Money' ? 'bg-blue-100 text-blue-800' : 
                        'bg-orange-100 text-orange-800'}
                    `}>
                      {donor.contributionType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donor.dateOfContribution}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition-colors"
                      title="Edit Donor"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDonor(donor.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                      title="Delete Donor"
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

      {/* Add Donor Modal */}
      {isAddDonorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Donor</h3>
              <button 
                onClick={() => setIsAddDonorModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donor Name
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newDonor.name}
                  onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contribution Amount
                </label>
                <input 
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newDonor.contributionAmount}
                  onChange={(e) => setNewDonor({...newDonor, contributionAmount: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contribution Type
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newDonor.contributionType}
                  onChange={(e) => setNewDonor({...newDonor, contributionType: e.target.value})}
                >
                  <option value="Money">Money</option>
                  <option value="Food">Food</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Contribution
                </label>
                <input 
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newDonor.dateOfContribution}
                  onChange={(e) => setNewDonor({...newDonor, dateOfContribution: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button 
                  onClick={() => setIsAddDonorModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddDonor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Donor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorManagement;