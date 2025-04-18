import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';

// Sample data (replace with API data)
const sampleBets = {
  '30s': {
    periodId: '2024072162775',
    numbers: { '0': 0, '1': 5, '2': 3, '3': 0, '4': 2, '5': 4, '6': 0, '7': 6, '8': 1, '9': 0 },
    colors: { Big: 2, Small: 3, Green: 1, Violet: 0, Red: 10 },
    users: {
      Red: [
        { userId: 'USR001', mobile: '+1234567890', amount: 100, betTime: '2025-04-13 10:30:00' },
        { userId: 'USR002', mobile: '+1234567891', amount: 50, betTime: '2025-04-13 10:29:00' },
      ],
      '5': [
        { userId: 'USR003', mobile: '+1234567892', amount: 75, betTime: '2025-04-13 10:28:00' },
      ],
    },
  },
  '1m': { periodId: '2024072162776', numbers: {}, colors: {}, users: {} },
  '5m': { periodId: '2024072162777', numbers: {}, colors: {}, users: {} },
  '10m': { periodId: '2024072162778', numbers: {}, colors: {}, users: {} },
};

const highRiskUsers = [
  { name: 'TRILOCHAN55', walletBalance: 1265.37 },
  { name: 'Rajkumar', walletBalance: 1664.52 },
];

const PredictionManagement = () => {
  const [activePeriod, setActivePeriod] = useState('30s');
  const [timeLeft, setTimeLeft] = useState(10); // Start with 10 seconds
  const [selectedBet, setSelectedBet] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState('');
  const currentBets = sampleBets[activePeriod];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Reset timer to 10 seconds on period or bet change
  useEffect(() => {
    setTimeLeft(10);
  }, [activePeriod, selectedBet]);

  // Handle bet selection
  const handleBetClick = (betType, betValue) => {
    setSelectedBet({ type: betType, value: betValue });
  };

  // Handle result submission (placeholder, replace with API call)
  const handleSubmitResult = () => {
    if (selectedResult) {
      console.log(`Manual result set to: ${selectedResult}`);
      setShowResultModal(false);
      setSelectedResult('');
      // TODO: Call API to submit result (e.g., POST /api/wingo/${activePeriod}/result { result: selectedResult })
    }
  };

  // Calculate total amount for a given number
  const getTotalAmount = (number) => {
    const users = currentBets.users[number] || [];
    return users.reduce((sum, user) => sum + user.amount, 0).toLocaleString();
  };

  return (
    <div className="card">
      <div className="card-header bg-primary-100">
        <h5 className="mb-0 text-primary-600 fw-semibold">Wingo Prediction</h5>
      </div>
      <div className="card-body p-4">
        {/* Period Selector and Timer */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <select
            className="form-select w-auto bg-white border-primary-300 text-primary-600"
            value={activePeriod}
            onChange={(e) => setActivePeriod(e.target.value)}
          >
            <option value="30s">30 Seconds</option>
            <option value="1m">1 Minute</option>
            <option value="5m">5 Minutes</option>
            <option value="10m">10 Minutes</option>
          </select>
          <div className="d-flex align-items-center gap-3">
            <span className="text-xl fw-bold text-danger">{currentBets.periodId}</span>
            <span className="text-lg fw-medium text-secondary-600">
              Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
            </span>
          </div>
        </div>

        {/* Bet Display */}
        <div className="p-4 bg-white rounded shadow-sm border border-primary-200 mb-4">
          <h6 className="mb-3 text-primary-600 fw-semibold">Numbers</h6>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {Object.entries(currentBets.numbers).map(([number, count]) => (
              <button
                key={number}
                className={`btn btn-sm position-relative ${count > 0 ? 'btn-success' : 'btn-secondary'} ${number === '0' ? 'gradient-red-violet' : number === '5' ? 'gradient-green-violet' : ''}`}
                style={{ width: '80px', height: '80px', fontSize: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '0' }}
                onClick={() => handleBetClick('number', number)}
              >
                {number}
                {count > 0 && <span className="badge bg-dark position-absolute top-50 end-0 translate-middle">{count}</span>}
                <span className="badge bg-info position-absolute top-0 start-0 translate-middle-y">
                  ${getTotalAmount(number)}
                </span>
              </button>
            ))}
          </div>
          <h6 className="mt-4 mb-3 text-primary-600 fw-semibold">Other Bets</h6>
          <div className="d-flex gap-3 justify-content-center">
            {['Big', 'Small', 'Green', 'Violet', 'Red'].map((color) => (
              <button
                key={color}
                className={`btn btn-sm ${currentBets.colors[color] > 0 ? '' : 'btn-secondary'} ${color.toLowerCase()}`}
                style={{ width: '100px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onClick={() => handleBetClick('color', color)}
              >
                {color} <span className="badge bg-dark">{currentBets.colors[color] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Set Result Box */}
        <div className="p-4 bg-white rounded shadow-sm border border-primary-200 mb-4">
          <div className="text-center">
            <button
              className="btn btn-lg btn-success w-50 py-3"
              style={{ fontSize: '1.25rem' }}
              onClick={() => setShowResultModal(true)}
            >
              Set Result
            </button>
          </div>
        </div>

        {/* Bet List (Visible when a bet is selected) */}
        {selectedBet && (
          <div className="p-4 bg-white rounded shadow-sm border border-primary-200 mb-4">
            <h6 className="mb-3 text-primary-600 fw-semibold">
              Users Betting on {selectedBet.type === 'number' ? `Number ${selectedBet.value}` : selectedBet.value}
            </h6>
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Mobile Number</th>
                    <th>Bet Amount</th>
                    <th>Bet Time</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBets.users[selectedBet.value]?.length > 0 ? (
                    currentBets.users[selectedBet.value].map((user, index) => (
                      <tr key={index}>
                        <td>{user.userId}</td>
                        <td>{user.mobile}</td>
                        <td>${user.amount.toLocaleString()}</td>
                        <td>{user.betTime}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-secondary-600">
                        No users betting on this option
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* High Risk Users */}
        <div className="p-4 bg-white rounded shadow-sm border border-primary-200 mb-4">
          <h6 className="mb-3 text-primary-600 fw-semibold">High Risk Users</h6>
          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="table bordered-table mb-0" style={{ minWidth: '400px' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Wallet Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {highRiskUsers.length > 0 ? (
                  highRiskUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>${user.walletBalance.toLocaleString()}</td>
                      <td>
                        <button className="btn btn-sm btn-danger">Block</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-secondary-600">
                      No high-risk users
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bet Distribution (Default Display) */}
        <div className="p-4 bg-white rounded shadow-sm border border-primary-200">
          <h6 className="mb-3 text-primary-600 fw-semibold">Bet Distribution</h6>
          <div className="row row-cols-5 g-3 mb-3">
            {Object.entries(currentBets.numbers).map(([number, count]) => (
              <div key={number} className="col text-center">
                <span className="d-block text-secondary-600">No. {number}: {count}</span>
              </div>
            ))}
          </div>
          <div className="row row-cols-5 g-3">
            {['Big', 'Small', 'Green', 'Violet', 'Red'].map((color) => (
              <div key={color} className="col text-center">
                <span className="d-block text-secondary-600">{color}: {currentBets.colors[color] || 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result Modal */}
        {showResultModal && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-primary-600">Set Manual Result</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowResultModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label text-secondary-600">Select Result (0-9)</label>
                    <select
                      className="form-select"
                      value={selectedResult}
                      onChange={(e) => setSelectedResult(e.target.value)}
                    >
                      <option value="">Select a number</option>
                      {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowResultModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmitResult}
                    disabled={!selectedResult}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add custom CSS for gradients and styling
const styles = `
  .gradient-red-violet {
    background: linear-gradient(to right, #ff0000 50%, #800080 50%);
    color: #fff;
  }
  .gradient-green-violet {
    background: linear-gradient(to right, #00ff00 50%, #800080 50%);
    color: #fff;
  }
  .big { background-color: #ffa500; color: #fff; }
  .small { background-color: #00ff00; color: #fff; }
  .green { background-color: #00ff00; color: #fff; }
  .violet { background-color: #800080; color: #fff; }
  .red { background-color: #ff0000; color: #fff; }
  .btn-success:hover, .btn-danger:hover { opacity: 0.9; }
  .badge { font-size: 0.75rem; }
  .badge.bg-info { background-color: #17a2b8; color: #fff; }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default PredictionManagement;