import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample user data (replace with API data)
const usersData = [
  {
    userId: 'USR001',
    mobile: '+1234567890',
    balance: 5000,
    isActive: true,
    loginIp: '192.168.1.1',
    totalDeposit: 10000,
    totalWithdrawal: 5000,
    totalCommission: 1500, // Added commission field
    isBlocked: false,
  },
  {
    userId: 'USR002',
    mobile: '+1234567891',
    balance: 3000,
    isActive: false,
    loginIp: '192.168.1.2',
    totalDeposit: 8000,
    totalWithdrawal: 4000,
    totalCommission: 1200, // Added commission field
    isBlocked: true,
  },
  {
    userId: 'USR003',
    mobile: '+1234567892',
    balance: 2000,
    isActive: true,
    loginIp: '192.168.1.3',
    totalDeposit: 6000,
    totalWithdrawal: 3000,
    totalCommission: 800, // Added commission field
    isBlocked: false,
  },
];

const AllUsersLayer = () => {
  const [users, setUsers] = useState(usersData);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [blockUserId, setBlockUserId] = useState(null);
  const [unblockUserId, setUnblockUserId] = useState(null);
  const [blockReason, setBlockReason] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editAction, setEditAction] = useState('add');
  const [editAmount, setEditAmount] = useState('');
  const [editReason, setEditReason] = useState('');

  // Handle block
  const handleBlockClick = (userId) => {
    setBlockUserId(userId);
    setShowBlockModal(true);
    setBlockReason('');
  };

  const handleBlockSubmit = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user.userId === blockUserId
          ? { ...user, isBlocked: true }
          : user
      )
    );
    setShowBlockModal(false);
    setBlockUserId(null);
    setBlockReason('');
    // TODO: Call API to block user with blockReason
  };

  // Handle unblock
  const handleUnblockClick = (userId) => {
    setUnblockUserId(userId);
    setShowUnblockModal(true);
  };

  const handleUnblockConfirm = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user.userId === unblockUserId ? { ...user, isBlocked: false } : user
      )
    );
    setShowUnblockModal(false);
    setUnblockUserId(null);
    // TODO: Call API to unblock user
  };

  // Handle edit balance modal
  const handleEditClick = (userId) => {
    setEditUserId(userId);
    setShowEditModal(true);
    setEditAction('add');
    setEditAmount('');
    setEditReason('');
  };

  const handleEditSubmit = () => {
    const amount = parseFloat(editAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.userId === editUserId
          ? {
              ...user,
              balance:
                editAction === 'add'
                  ? user.balance + amount
                  : user.balance - amount,
            }
          : user
      )
    );

    // Log the adjustment (replace with API call)
    console.log({
      userId: editUserId,
      action: editAction,
      amount,
      reason: editReason,
    });

    setShowEditModal(false);
    setEditUserId(null);
    setEditAmount('');
    setEditReason('');
    // TODO: Call API to update balance (e.g., POST /api/users/:userId/balance { action, amount, reason })
  };

  return (
    <div className="card">
      {/* Card Header */}
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span>Show</span>
            <select
              className="form-select form-select-sm w-auto"
              defaultValue="10"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="icon-field">
            <input
              type="text"
              className="form-control form-control-sm w-auto"
              placeholder="Search by User ID or Mobile"
            />
            <span className="icon">
              <Icon icon="ion:search-outline" />
            </span>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <select
            className="form-select form-select-sm w-auto"
            defaultValue="All"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
          <Link to="/users/add" className="btn btn-sm btn-primary-600">
            <i className="ri-add-line" /> Add User
          </Link>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Scrollable Table Wrapper */}
        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="table bordered-table mb-0" style={{ minWidth: '1100px' }}>
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check style-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkAll"
                    />
                    <label className="form-check-label" htmlFor="checkAll">
                      S.L
                    </label>
                  </div>
                </th>
                <th scope="col">User ID</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Status</th>
                <th scope="col">Login IP</th>
                <th scope="col">Total Deposit</th>
                <th scope="col">Total Withdrawal</th>
                <th scope="col">Commission Detail</th>
                <th scope="col">Block/Unblock</th>
                <th scope="col">More Info</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId}>
                  <td>
                    <div className="form-check style-check d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`check${index}`}
                      />
                      <label className="form-check-label" htmlFor={`check${index}`}>
                        {String(index + 1).padStart(2, '0')}
                      </label>
                    </div>
                  </td>
                  <td>
                    <Link to="#" className="text-primary-600">
                      {user.userId}
                    </Link>
                  </td>
                  <td>{user.mobile}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      ${user.balance.toLocaleString()}
                      <button
                        className="btn btn-sm btn-primary-light p-0"
                        onClick={() => handleEditClick(user.userId)}
                      >
                        <Icon icon="lucide:edit" className="text-sm" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`d-inline-block w-12-px h-12-px rounded-circle ${
                        user.isActive ? 'bg-success-main' : 'bg-danger-main'
                      }`}
                    ></span>
                  </td>
                  <td>{user.loginIp}</td>
                  <td>${user.totalDeposit.toLocaleString()}</td>
                  <td>${user.totalWithdrawal.toLocaleString()}</td>
                  <td>${user.totalCommission.toLocaleString()}</td>
                  <td>
                    {user.isBlocked ? (
                      <button
                        className="btn btn-sm btn-success-600"
                        onClick={() => handleUnblockClick(user.userId)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-danger-600"
                        onClick={() => handleBlockClick(user.userId)}
                      >
                        Block
                      </button>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/user/${user.userId}`}
                      className="btn btn-sm btn-primary-600"
                    >
                      More Info
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
          <span>Showing 1 to {users.length} of {users.length} entries</span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
              <Link
                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
                to="#"
              >
                <Icon icon="ep:d-arrow-left" className="text-xl" />
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-primary-600 text-white fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px"
                to="#"
              >
                1
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
                to="#"
              >
                <Icon icon="ep:d-arrow-right" className="text-xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Block Reason Modal */}
      {showBlockModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Block User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBlockModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Reason for Blocking</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    placeholder="Enter the reason for blocking this user"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowBlockModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger-600"
                  onClick={handleBlockSubmit}
                  disabled={!blockReason.trim()}
                >
                  Block User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unblock Confirmation Modal */}
      {showUnblockModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Unblock User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowUnblockModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to unblock this user?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUnblockModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success-600"
                  onClick={handleUnblockConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Balance Modal */}
      {showEditModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Balance</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Action</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="editAction"
                        id="add"
                        value="add"
                        checked={editAction === 'add'}
                        onChange={() => setEditAction('add')}
                      />
                      <label className="form-check-label" htmlFor="add">
                        Add
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="editAction"
                        id="deduct"
                        value="deduct"
                        checked={editAction === 'deduct'}
                        onChange={() => setEditAction('deduct')}
                      />
                      <label className="form-check-label" htmlFor="deduct">
                        Deduct
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Reason</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={editReason}
                    onChange={(e) => setEditReason(e.target.value)}
                    placeholder="Enter the reason for this adjustment"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary-600"
                  onClick={handleEditSubmit}
                  disabled={!editAmount || !editReason.trim()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersLayer;