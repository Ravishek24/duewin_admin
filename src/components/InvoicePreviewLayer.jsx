import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

// Sample gift claim history data (replace with API data)
const sampleClaimHistory = [
  {
    userId: 'USR001',
    mobile: '+1234567890',
    claimIp: '192.168.1.1',
    claimedTime: '2025-04-13 10:30:00',
    claimAmount: 10,
  },
  {
    userId: 'USR002',
    mobile: '+1234567891',
    claimIp: '192.168.1.2',
    claimedTime: '2025-04-13 09:15:00',
    claimAmount: 10,
  },
  {
    userId: 'USR003',
    mobile: '+1234567892',
    claimIp: '192.168.1.3',
    claimedTime: '2025-04-12 14:45:00',
    claimAmount: 10,
  },
];

const InvoicePreviewLayer = () => {
  // State for gift creation form
  const [giftAmount, setGiftAmount] = useState('');
  const [userCount, setUserCount] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [formError, setFormError] = useState('');

  // State for claim history table
  const [claimHistory, setClaimHistory] = useState(sampleClaimHistory);
  const [sortConfig, setSortConfig] = useState({ key: 'claimedTime', direction: 'desc' });

  // Handle gift code creation
  const handleCreateGift = (e) => {
    e.preventDefault();
    setFormError('');

    const amount = parseFloat(giftAmount);
    const users = parseInt(userCount);

    if (!amount || amount <= 0) {
      setFormError('Please enter a valid gift amount.');
      return;
    }
    if (!users || users <= 0) {
      setFormError('Please enter a valid number of users.');
      return;
    }

    // Simulate code generation (replace with API call)
    const newCode = `GIFT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setGeneratedCode(newCode);
    setGiftAmount('');
    setUserCount('');
    // TODO: Call API to create gift code (e.g., POST /api/gifts { amount, userCount })
  };

  // Handle copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.write(generatedCode);
    alert('Gift code copied to clipboard!');
  };

  // Sorting function for claim history
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Handle date sorting
      if (key === 'claimedTime') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  // Sorted claim history
  const sortedClaimHistory = sortData(claimHistory, sortConfig.key, sortConfig.direction);

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Gift Management</h5>
      </div>
      <div className="card-body py-4">
        <div className="row">
          {/* Create Gift Code Section */}
          <div className="col-lg-6 mb-4">
            <div className="p-4 bg-base rounded shadow-4">
              <h6 className="mb-3">Create Gift Code</h6>
              <form onSubmit={handleCreateGift}>
                <div className="mb-3">
                  <label className="form-label">Gift Amount (INR)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={giftAmount}
                    onChange={(e) => setGiftAmount(e.target.value)}
                    placeholder="e.g., 10"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Number of Users</label>
                  <input
                    type="number"
                    className="form-control"
                    value={userCount}
                    onChange={(e) => setUserCount(e.target.value)}
                    placeholder="e.g., 100"
                    min="1"
                    required
                  />
                </div>
                {formError && (
                  <div className="alert alert-danger py-2" role="alert">
                    {formError}
                  </div>
                )}
                <button type="submit" className="btn btn-primary-600 radius-8">
                  <Icon icon="ri:gift-line" className="me-1" />
                  Generate Gift Code
                </button>
              </form>
              {generatedCode && (
                <div className="mt-4">
                  <h6>Generated Code:</h6>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={generatedCode}
                      readOnly
                    />
                    <button
                      className="btn btn-success-600"
                      onClick={handleCopyCode}
                    >
                      <Icon icon="mdi:content-copy" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gift Claim History Section */}
          <div className="col-lg-12">
            <div className="p-4 bg-base rounded shadow-4">
              <h6 className="mb-3">Gift Claim History</h6>
              <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
                  <thead>
                    <tr>
                      <th
                        className="cursor-pointer"
                        onClick={() => handleSort('userId')}
                      >
                        User ID
                        {sortConfig.key === 'userId' && (
                          <Icon
                            icon={
                              sortConfig.direction === 'asc'
                                ? 'bxs:up-arrow'
                                : 'bxs:down-arrow'
                            }
                            className="text-xs ms-1"
                          />
                        )}
                      </th>
                      <th
                        className="cursor-pointer"
                        onClick={() => handleSort('mobile')}
                      >
                        Mobile Number
                        {sortConfig.key === 'mobile' && (
                          <Icon
                            icon={
                              sortConfig.direction === 'asc'
                                ? 'bxs:up-arrow'
                                : 'bxs:down-arrow'
                            }
                            className="text-xs ms-1"
                          />
                        )}
                      </th>
                      <th
                        className="cursor-pointer"
                        onClick={() => handleSort('claimIp')}
                      >
                        Claim IP
                        {sortConfig.key === 'claimIp' && (
                          <Icon
                            icon={
                              sortConfig.direction === 'asc'
                                ? 'bxs:up-arrow'
                                : 'bxs:down-arrow'
                            }
                            className="text-xs ms-1"
                          />
                        )}
                      </th>
                      <th
                        className="cursor-pointer"
                        onClick={() => handleSort('claimedTime')}
                      >
                        Claimed Time
                        {sortConfig.key === 'claimedTime' && (
                          <Icon
                            icon={
                              sortConfig.direction === 'asc'
                                ? 'bxs:up-arrow'
                                : 'bxs:down-arrow'
                            }
                            className="text-xs ms-1"
                          />
                        )}
                      </th>
                      <th
                        className="cursor-pointer"
                        onClick={() => handleSort('claimAmount')}
                      >
                        Claim Amount (INR)
                        {sortConfig.key === 'claimAmount' && (
                          <Icon
                            icon={
                              sortConfig.direction === 'asc'
                                ? 'bxs:up-arrow'
                                : 'bxs:down-arrow'
                            }
                            className="text-xs ms-1"
                          />
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedClaimHistory.length > 0 ? (
                      sortedClaimHistory.map((claim, index) => (
                        <tr key={index}>
                          <td>{claim.userId}</td>
                          <td>{claim.mobile}</td>
                          <td>{claim.claimIp}</td>
                          <td>{claim.claimedTime}</td>
                          <td>₹{claim.claimAmount.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No gift claims found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewLayer;

