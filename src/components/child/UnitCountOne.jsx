import React, { useState } from 'react';
import { Icon } from '@iconify/react';

// Sample data for demonstration (replace with API data)
const topDeposits = [
  { userId: 'USR001', mobile: '+1234567890', amount: 5000 },
  { userId: 'USR002', mobile: '+1234567891', amount: 3000 },
  { userId: 'USR003', mobile: '+1234567892', amount: 2000 },
  { userId: 'USR004', mobile: '+1234567893', amount: 1500 },
  { userId: 'USR005', mobile: '+1234567894', amount: 1000 },
];

const topWithdrawals = [
  { userId: 'USR006', mobile: '+1234567895', amount: 4000 },
  { userId: 'USR007', mobile: '+1234567896', amount: 2500 },
  { userId: 'USR008', mobile: '+1234567897', amount: 1800 },
  { userId: 'USR009', mobile: '+1234567898', amount: 1200 },
  { userId: 'USR010', mobile: '+1234567899', amount: 900 },
];

// New Component for Top Transactions
const TopTransactions = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'amount', direction: 'desc' });

  // Sorting function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  // Sorted data
  const sortedDeposits = sortData(topDeposits, sortConfig.key, sortConfig.direction);
  const sortedWithdrawals = sortData(topWithdrawals, sortConfig.key, sortConfig.direction);

  // Table component for reusability
  const TransactionTable = ({ title, data, type }) => (
    <div className="card shadow-none border mt-4">
      <div className="card-body p-20">
        <h6 className="mb-4">{title}</h6>
        <div className="table-responsive">
          <table className="table table-hover">
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
                  onClick={() => handleSort('amount')}
                >
                  {type === 'deposit' ? 'Deposit Amount' : 'Withdrawal Amount'}
                  {sortConfig.key === 'amount' && (
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
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.userId}</td>
                  <td>{item.mobile}</td>
                  <td>${item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-4">
      <TransactionTable
        title="Today Top Deposits"
        data={sortedDeposits}
        type="deposit"
      />
      <TransactionTable
        title="Today Top Withdrawals"
        data={sortedWithdrawals}
        type="withdrawal"
      />
    </div>
  );
};

// Updated DashboardStats Component (including previous boxes + new tables)
const DashboardStats = () => {
  const handleBoxClick = (boxName) => {
    console.log(`${boxName} clicked!`);
    // Add your navigation or action logic here
  };

  return (
    <>
      <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
        {/* Users Box */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-1 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Users')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">Users</p>
                  <h6 className="mb-0">20,000</h6>
                </div>
                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="gridicons:multiple-users"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  <Icon icon="bxs:up-arrow" className="text-xs" /> +5000
                </span>
                Today: 150 | Blocked: 25
              </p>
            </div>
          </div>
        </div>

        {/* Profit Box */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-2 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Profit')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">Profit</p>
                  <h6 className="mb-0">$15,000</h6>
                </div>
                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="fa-solid:chart-line"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  <Icon icon="bxs:up-arrow" className="text-xs" /> +$800
                </span>
                Weekly: $5K | Monthly: $12K
              </p>
            </div>
          </div>
        </div>

        {/* Live Active Users */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-3 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Live Active Users')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    Live Active Users
                  </p>
                  <h6 className="mb-0">2,500</h6>
                </div>
                <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="fluent:people-20-filled"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  <Icon icon="bxs:up-arrow" className="text-xs" /> +200
                </span>
                Last hour: 1,200
              </p>
            </div>
          </div>
        </div>

        {/* Today Bets */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-4 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Today Bets')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">Today Bets</p>
                  <h6 className="mb-0">1,200</h6>
                </div>
                <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="mdi:casino-chip"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  <Icon icon="bxs:up-arrow" className="text-xs" /> +150
                </span>
                Total: $8,500
              </p>
            </div>
          </div>
        </div>

        {/* Today Recharges */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-5 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Today Recharges')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    Today Recharges
                  </p>
                  <h6 className="mb-0">$5,000</h6>
                </div>
                <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="mdi:credit-card-plus"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  <Icon icon="bxs:up-arrow" className="text-xs" /> +$1,000
                </span>
                PayPal: $2K | Stripe: $3K
              </p>
            </div>
          </div>
        </div>

        {/* Total Recharges */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-1 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Total Recharges')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    Total Recharges
                  </p>
                  <h6 className="mb-0">$50,000</h6>
                </div>
                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="mdi:credit-card"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  <Icon icon="bxs:up-arrow" className="text-xs" /> +$5,000
                </span>
                PayPal: $20K | Stripe: $30K
              </p>
            </div>
          </div>
        </div>

        {/* Today Withdrawals */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-2 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Today Withdrawals')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    Today Withdrawals
                  </p>
                  <h6 className="mb-0">$3,000</h6>
                </div>
                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="mdi:bank-transfer-out"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                  <Icon icon="bxs:down-arrow" className="text-xs" /> -$500
                </span>
                Bank: $2K | PayPal: $1K
              </p>
            </div>
          </div>
        </div>

        {/* Total Withdrawals */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-3 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Total Withdrawals')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    Total Withdrawals
                  </p>
                  <h6 className="mb-0">$30,000</h6>
                </div>
                <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="mdi:bank-transfer"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                  <Icon icon="bxs:down-arrow" className="text-xs" /> -$3,000
                </span>
                Bank: $20K | PayPal: $10K
              </p>
            </div>
          </div>
        </div>

        {/* Pending Recharge */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-4 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Pending Recharge')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    Pending Recharge
                  </p>
                  <h6 className="mb-0">15</h6>
                </div>
                <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="mdi:clock-outline"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                  <Icon icon="bxs:down-arrow" className="text-xs" /> -5
                </span>
                Total: $1,500
              </p>
            </div>
          </div>
        </div>

        {/* Pending Withdrawal */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-5 h-100 cursor-pointer"
            onClick={() => handleBoxClick('Pending Withdrawal')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    Pending Withdrawal
                  </p>
                  <h6 className="mb-0">10</h6>
                </div>
                <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="mdi:clock-outline"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                  <Icon icon="bxs:down-arrow" className="text-xs" /> -2
                </span>
                Processing: 5 | Pending: 5
              </p>
            </div>
          </div>
        </div>

        {/* Today First Recharges */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-1 h-100 cursor-pointer"
            onClick={() => handleBoxClick('First Recharges')}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    First Recharges
                  </p>
                  <h6 className="mb-0">50</h6>
                </div>
                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                  <Icon icon="mdi:star" className="text-white text-2xl mb-0" />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  <Icon icon="bxs:up-arrow" className="text-xs" /> +10
                </span>
                Total: $2,000
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Transactions Tables */}
      <TopTransactions />
    </>
  );
};

export default DashboardStats;