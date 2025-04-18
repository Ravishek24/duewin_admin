import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

// Sample data (replace with API data)
const sampleUserData = {
  userId: 'USR001',
  betHistory: [
    { id: 'BET001', date: '2025-04-10', type: 'Sports', amount: 100, outcome: 'Win', status: 'Settled' },
    { id: 'BET002', date: '2025-04-09', type: 'Casino', amount: 50, outcome: 'Loss', status: 'Settled' },
    { id: 'BET003', date: '2025-04-08', type: 'Sports', amount: 200, outcome: 'Pending', status: 'Open' },
  ],
  depositHistory: [
    { id: 'DEP001', date: '2025-04-10', amount: 1000, method: 'PayPal', status: 'Completed' },
    { id: 'DEP002', date: '2025-04-09', amount: 500, method: 'Stripe', status: 'Completed' },
    { id: 'DEP003', date: '2025-04-08', amount: 200, method: 'Bank Transfer', status: 'Pending' },
  ],
  withdrawalHistory: [
    { id: 'WTH001', date: '2025-04-10', amount: 300, method: 'Bank Transfer', status: 'Completed' },
    { id: 'WTH002', date: '2025-04-09', amount: 200, method: 'PayPal', status: 'Processing' },
    { id: 'WTH003', date: '2025-04-08', amount: 100, method: 'USDT', status: 'Completed' },
  ],
  bankDetails: {
    bankName: 'Example Bank',
    accountNumber: '1234567890',
    accountHolder: 'John Doe',
    iban: 'XX12345678901234567890',
    swift: 'EXABUS33XXX',
  },
  usdtDetails: {
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    network: 'ERC20',
    lastUpdated: '2025-04-01',
  },
  kycDetails: {
    status: 'Verified',
    fullName: 'John Doe',
    documentType: 'Passport',
    documentNumber: 'P12345678',
    verificationDate: '2025-03-15',
    address: '123 Main St, City, Country',
  },
};

const UserDetails = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('betHistory');

  // Simulate fetching user data (replace with API call)
  const user = sampleUserData; // TODO: Fetch from API using userId

  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h5 className="mb-0">User Details: {userId}</h5>
        <Link to="/users" className="btn btn-sm btn-primary-600">
          <Icon icon="ep:arrow-left" className="me-1" /> Back to Users
        </Link>
      </div>
      <div className="card-body">
        {/* Tabs Navigation */}
        <ul className="nav nav-tabs mb-4" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'betHistory' ? 'active' : ''}`}
              onClick={() => setActiveTab('betHistory')}
            >
              Bet History
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'depositHistory' ? 'active' : ''}`}
              onClick={() => setActiveTab('depositHistory')}
            >
              Deposit History
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'withdrawalHistory' ? 'active' : ''}`}
              onClick={() => setActiveTab('withdrawalHistory')}
            >
              Withdrawal History
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'bankDetails' ? 'active' : ''}`}
              onClick={() => setActiveTab('bankDetails')}
            >
              Bank Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'usdtDetails' ? 'active' : ''}`}
              onClick={() => setActiveTab('usdtDetails')}
            >
              USDT Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'kycDetails' ? 'active' : ''}`}
              onClick={() => setActiveTab('kycDetails')}
            >
              KYC Details
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Bet History */}
          {activeTab === 'betHistory' && (
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th>Bet ID</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Outcome</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user.betHistory.length > 0 ? (
                    user.betHistory.map((bet) => (
                      <tr key={bet.id}>
                        <td>{bet.id}</td>
                        <td>{bet.date}</td>
                        <td>{bet.type}</td>
                        <td>${bet.amount.toLocaleString()}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-pill text-sm ${
                              bet.outcome === 'Win'
                                ? 'bg-success-focus text-success-main'
                                : bet.outcome === 'Loss'
                                ? 'bg-danger-focus text-danger-main'
                                : 'bg-warning-focus text-warning-main'
                            }`}
                          >
                            {bet.outcome}
                          </span>
                        </td>
                        <td>{bet.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No bet history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Deposit History */}
          {activeTab === 'depositHistory' && (
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th>Deposit ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user.depositHistory.length > 0 ? (
                    user.depositHistory.map((deposit) => (
                      <tr key={deposit.id}>
                        <td>{deposit.id}</td>
                        <td>{deposit.date}</td>
                        <td>${deposit.amount.toLocaleString()}</td>
                        <td>{deposit.method}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-pill text-sm ${
                              deposit.status === 'Completed'
                                ? 'bg-success-focus text-success-main'
                                : 'bg-warning-focus text-warning-main'
                            }`}
                          >
                            {deposit.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No deposit history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Withdrawal History */}
          {activeTab === 'withdrawalHistory' && (
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th>Withdrawal ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user.withdrawalHistory.length > 0 ? (
                    user.withdrawalHistory.map((withdrawal) => (
                      <tr key={withdrawal.id}>
                        <td>{withdrawal.id}</td>
                        <td>{withdrawal.date}</td>
                        <td>${withdrawal.amount.toLocaleString()}</td>
                        <td>{withdrawal.method}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-pill text-sm ${
                              withdrawal.status === 'Completed'
                                ? 'bg-success-focus text-success-main'
                                : withdrawal.status === 'Processing'
                                ? 'bg-warning-focus text-warning-main'
                                : 'bg-danger-focus text-danger-main'
                            }`}
                          >
                            {withdrawal.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No withdrawal history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Bank Details */}
          {activeTab === 'bankDetails' && (
            <div className="p-3 bg-base rounded">
              <h6 className="mb-3">Bank Details</h6>
              <dl className="row mb-0">
                <dt className="col-sm-4">Bank Name</dt>
                <dd className="col-sm-8">{user.bankDetails.bankName || 'N/A'}</dd>
                <dt className="col-sm-4">Account Number</dt>
                <dd className="col-sm-8">{user.bankDetails.accountNumber || 'N/A'}</dd>
                <dt className="col-sm-4">Account Holder</dt>
                <dd className="col-sm-8">{user.bankDetails.accountHolder || 'N/A'}</dd>
                <dt className="col-sm-4">IBAN</dt>
                <dd className="col-sm-8">{user.bankDetails.iban || 'N/A'}</dd>
                <dt className="col-sm-4">SWIFT</dt>
                <dd className="col-sm-8">{user.bankDetails.swift || 'N/A'}</dd>
              </dl>
            </div>
          )}

          {/* USDT Details */}
          {activeTab === 'usdtDetails' && (
            <div className="p-3 bg-base rounded">
              <h6 className="mb-3">USDT Details</h6>
              <dl className="row mb-0">
                <dt className="col-sm-4">Wallet Address</dt>
                <dd className="col-sm-8">{user.usdtDetails.walletAddress || 'N/A'}</dd>
                <dt className="col-sm-4">Network</dt>
                <dd className="col-sm-8">{user.usdtDetails.network || 'N/A'}</dd>
                <dt className="col-sm-4">Last Updated</dt>
                <dd className="col-sm-8">{user.usdtDetails.lastUpdated || 'N/A'}</dd>
              </dl>
            </div>
          )}

          {/* KYC Details */}
          {activeTab === 'kycDetails' && (
            <div className="p-3 bg-base rounded">
              <h6 className="mb-3">KYC Details</h6>
              <dl className="row mb-0">
                <dt className="col-sm-4">Status</dt>
                <dd className="col-sm-8">
                  <span
                    className={`px-2 py-1 rounded-pill text-sm ${
                      user.kycDetails.status === 'Verified'
                        ? 'bg-success-focus text-success-main'
                        : 'bg-warning-focus text-warning-main'
                    }`}
                  >
                    {user.kycDetails.status || 'N/A'}
                  </span>
                </dd>
                <dt className="col-sm-4">Full Name</dt>
                <dd className="col-sm-8">{user.kycDetails.fullName || 'N/A'}</dd>
                <dt className="col-sm-4">Document Type</dt>
                <dd className="col-sm-8">{user.kycDetails.documentType || 'N/A'}</dd>
                <dt className="col-sm-4">Document Number</dt>
                <dd className="col-sm-8">{user.kycDetails.documentNumber || 'N/A'}</dd>
                <dt className="col-sm-4">Verification Date</dt>
                <dd className="col-sm-8">{user.kycDetails.verificationDate || 'N/A'}</dd>
                <dt className="col-sm-4">Address</dt>
                <dd className="col-sm-8">{user.kycDetails.address || 'N/A'}</dd>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;