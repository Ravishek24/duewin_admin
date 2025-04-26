
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
        { userId: 'USR001', mobile: '+1234567890', amount: 100, betTime: '2025-04-13 10:30:00', balanceAfterBet: 4900 },
        { userId: 'USR002', mobile: '+1234567891', amount: 50, betTime: '2025-04-13 10:29:00', balanceAfterBet: 2950 },
      ],
      '5': [
        { userId: 'USR003', mobile: '+1234567892', amount: 75, betTime: '2025-04-13 10:28:00', balanceAfterBet: 1925 },
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

  // Handle unset result
  const handleUnsetResult = () => {
    console.log('Result unset');
    setSelectedResult('');
    setShowResultModal(false);
    // TODO: Call API to unset result (e.g., DELETE /api/wingo/${activePeriod}/result)
  };

  // Calculate total amount for a given number or color
  const getTotalAmount = (value) => {
    const users = currentBets.users[value] || [];
    return users.reduce((sum, user) => sum + user.amount, 0).toLocaleString();
  };

  // Flatten user bets for the table
  const getUserBets = () => {
    const bets = [];
    Object.entries(currentBets.users).forEach(([selection, users]) => {
      users.forEach((user) => {
        bets.push({
          userId: user.userId,
          mobile: user.mobile,
          amount: user.amount,
          selection,
          balanceAfterBet: user.balanceAfterBet,
        });
      });
    });
    return bets;
  };

  const userBets = getUserBets();

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
        <div className="p-4 bg-white rounded-lg shadow-sm border border-primary-200 mb-4">
          <h6 className="mb-3 text-primary-600 fw-semibold">Numbers</h6>
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            {Object.entries(currentBets.numbers).map(([number, count]) => (
              <div key={number} className="text-center">
                <button
                  className={`btn btn-sm position-relative ${count > 0 ? 'btn-success' : 'btn-secondary'} ${number === '0' ? 'gradient-red-violet' : number === '5' ? 'gradient-green-violet' : ''}`}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    fontSize: '1.75rem', 
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)', 
                    borderRadius: '8px', 
                    transition: 'transform 0.2s' 
                  }}
                  onClick={() => handleBetClick('number', number)}
                >
                  {number}
                  {count > 0 && (
                    <span className="badge bg-dark position-absolute top-0 end-0 translate-middle rounded-circle" style={{ width: '24px', height: '24px', fontSize: '0.9rem' }}>
                      {count}
                    </span>
                  )}
                </button>
                <div
                  className="mt-2 bg-gray-200 text-black rounded-lg p-3"
                  style={{
                    minWidth: '200px',
                    height: '50px',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getTotalAmount(number)}
                </div>
              </div>
            ))}
          </div>
          <h6 className="mt-4 mb-3 text-primary-600 fw-semibold">Other Bets</h6>
          <div className="d-flex gap-4 justify-content-center flex-wrap">
            {['Big', 'Small', 'Green', 'Violet', 'Red'].map((color) => (
              <div key={color} className="text-center">
                <button
                  className={`btn btn-sm ${currentBets.colors[color] > 0 ? '' : 'btn-secondary'} ${color.toLowerCase()}`}
                  style={{ 
                    width: '100px', 
                    padding: '10px', 
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)', 
                    borderRadius: '8px' 
                  }}
                  onClick={() => handleBetClick('color', color)}
                >
                  {color} <span className="badge bg-dark rounded-pill" style={{ fontSize: '0.9rem' }}>{currentBets.colors[color] || 0}</span>
                </button>
                <div
                  className="mt-2 bg-gray-200 text-black rounded-lg p-3"
                  style={{
                    minWidth: '200px',
                    height: '50px',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getTotalAmount(color)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Set Result Box */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-primary-200 mb-4">
          <div className="text-center">
            <button
              className="btn btn-lg btn-success w-40 py-3 me-2"
              style={{ fontSize: '1.25rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}
              onClick={() => setShowResultModal(true)}
            >
              Set Result
            </button>
            <button
              className="btn btn-lg btn-danger w-40 py-3"
              style={{ fontSize: '1.25rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}
              onClick={handleUnsetResult}
            >
              Unset Result
            </button>
          </div>
        </div>

        {/* Bet List (Visible when a bet is selected) */}
        {selectedBet && (
          <div className="p-4 bg-white rounded-lg shadow-sm border border-primary-200 mb-4">
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
        

        {/* Bet Distribution Table */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-primary-200">
          <h6 className="mb-3 text-primary-600 fw-semibold">Bet Distribution</h6>
          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Mobile Number</th>
                  <th>Bet Amount</th>
                  <th>Selection</th>
                  <th>Balance After Bet</th>
                </tr>
              </thead>
              <tbody>
                {userBets.length > 0 ? (
                  userBets.map((bet, index) => (
                    <tr key={index}>
                      <td>{bet.userId}</td>
                      <td>{bet.mobile}</td>
                      <td>${bet.amount.toLocaleString()}</td>
                      <td>{bet.selection}</td>
                      <td>${bet.balanceAfterBet.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-secondary-600">
                      No bets placed for this period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
    transition: transform 0.2s;
  }
  .gradient-red-violet:hover {
    transform: scale(1.05);
  }
  .gradient-green-violet {
    background: linear-gradient(to right, #00ff00 50%, #800080 50%);
    color: #fff;
    transition: transform 0.2s;
  }
  .gradient-green-violet:hover {
    transform: scale(1.05);
  }
  .big { background-color: #ffa500; color: #fff; }
  .small { background-color: #00ff00; color: #fff; }
  .green { background-color: #00ff00; color: #fff; }
  .violet { background-color: #800080; color: #fff; }
  .red { background-color: #ff0000; color: #fff; }
  .btn-success { 
    background-color: #28a745; 
    transition: transform 0.2s; 
  }
  .btn-success:hover { 
    transform: scale(1.05); 
    opacity: 0.9; 
  }
  .btn-secondary { 
    background-color: #6c757d; 
    transition: transform 0.2s; 
  }
  .btn-secondary:hover { 
    transform: scale(1.05); 
    opacity: 0.9; 
  }
  .btn-danger { 
    background-color: #dc3545; 
    transition: transform 0.2s; 
  }
  .btn-danger:hover { 
    transform: scale(1.05); 
    opacity: 0.9; 
  }
  .bg-gray-200 { background-color: #e5e7eb; }
  .badge.bg-dark { 
    background-color: #343a40; 
    color: #fff; 
  }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default PredictionManagement;
