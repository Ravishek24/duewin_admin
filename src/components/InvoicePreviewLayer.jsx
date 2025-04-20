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

// Sample gift code history data (replace with API data)
const sampleGiftCodeHistory = [
  {
    code: 'GIFT-ABC123',
    amount: 10,
    userCount: 100,
    generatedTime: '2025-04-13 08:00:00',
  },
  {
    code: 'GIFT-XYZ789',
    amount: 20,
    userCount: 50,
    generatedTime: '2025-04-12 12:30:00',
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
  const [giftCodeHistory, setGiftCodeHistory] = useState(sampleGiftCodeHistory);
  const [sortConfig, setSortConfig] = useState({ key: 'claimedTime', direction: 'desc' });
  const [giftSortConfig, setGiftSortConfig] = useState({ key: 'generatedTime', direction: 'desc' });

  // State for active tab
  const [activeTab, setActiveTab] = useState('claimHistory');

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

    // Add to gift code history
    setGiftCodeHistory((prev) => [
      ...prev,
      {
        code: newCode,
        amount,
        userCount: users,
        generatedTime: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      },
    ]);

    setGiftAmount('');
    setUserCount('');
    // TODO: Call API to create gift code (e.g., POST /api/gifts { amount, userCount })
  };

  // Handle copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.write(generatedCode);
    alert('Gift code copied to clipboard!');
  };

  // Sorting function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Handle date sorting
      if (key === 'claimedTime' || key === 'generatedTime') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Handle sorting for claim history
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  // Handle sorting for gift code history
  const handleGiftSort = (key) => {
    setGiftSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  // Sorted data
  const sortedClaimHistory = sortData(claimHistory, sortConfig.key, sortConfig.direction);
  const sortedGiftCodeHistory = sortData(giftCodeHistory, giftSortConfig.key, giftSortConfig.direction);

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

          {/* Tabs and History Section */}
          <div className="col-lg-12">
            <div className="p-4 bg-base rounded shadow-4">
              {/* Tab Navigation */}
              <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'claimHistory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('claimHistory')}
                  >
                    Gift Claim History
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                  >
                    History
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              {activeTab === 'claimHistory' && (
                <div>
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
              )}

              {activeTab === 'history' && (
                <div>
                  <h6 className="mb-3">Gift Code Generation History</h6>
                  <div className="table-responsive" style={{ overflowX: 'auto' }}>
                    <table className="table bordered-table mb-0" style={{ minWidth: '600px' }}>
                      <thead>
                        <tr>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleGiftSort('code')}
                          >
                            Gift Code
                            {giftSortConfig.key === 'code' && (
                              <Icon
                                icon={
                                  giftSortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleGiftSort('amount')}
                          >
                            Amount (INR)
                            {giftSortConfig.key === 'amount' && (
                              <Icon
                                icon={
                                  giftSortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleGiftSort('userCount')}
                          >
                            Number of Users
                            {giftSortConfig.key === 'userCount' && (
                              <Icon
                                icon={
                                  giftSortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleGiftSort('generatedTime')}
                          >
                            Generated Time
                            {giftSortConfig.key === 'generatedTime' && (
                              <Icon
                                icon={
                                  giftSortConfig.direction === 'asc'
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
                        {sortedGiftCodeHistory.length > 0 ? (
                          sortedGiftCodeHistory.map((gift, index) => (
                            <tr key={index}>
                              <td>{gift.code}</td>
                              <td>₹{gift.amount.toLocaleString()}</td>
                              <td>{gift.userCount}</td>
                              <td>{gift.generatedTime}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No gift codes generated
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewLayer;