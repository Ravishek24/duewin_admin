import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";


// Mock data for demonstration (replace with API data in production)
const pendingRecharges = [
  {
    userId: "USR001",
    mobileNumber: "+91 9876543210",
    orderId: "ORD12345",
    amount: "100 USDT",
    createTime: "2025-04-14 10:30 AM",
    gatewayName: "Paytm",
  },
  {
    userId: "USR002",
    mobileNumber: "+91 8765432109",
    orderId: "ORD12346",
    amount: "₹5000",
    createTime: "2025-04-14 11:00 AM",
    gatewayName: "Razorpay",
  },
];

const approvedRecharges = [
  {
    userId: "USR003",
    mobileNumber: "+91 7654321098",
    orderId: "ORD12347",
    amount: "200 USDT",
    gatewayName: "Coinbase",
    successTime: "2025-04-14 09:45 AM",
  },
  {
    userId: "USR004",
    mobileNumber: "+91 6543210987",
    orderId: "ORD12348",
    amount: "₹3000",
    gatewayName: "PhonePe",
    successTime: "2025-04-14 08:20 AM",
  },
];

const RechargeManagement = () => {
  const [pending, setPending] = useState(pendingRecharges);
  const [approved, setApproved] = useState(approvedRecharges);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const navigate = useNavigate();


  // Handle Success action
  const handleSuccess = (orderId) => {
    const recharge = pending.find((item) => item.orderId === orderId);
    if (recharge) {
      setApproved([
        ...approved,
        {
          ...recharge,
          successTime: new Date().toLocaleString("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        },
      ]);
      setPending(pending.filter((item) => item.orderId !== orderId));
      console.log(`Success for Order ID: ${orderId}`);
    }
  };

  // Open Reject Modal
  const openRejectModal = (orderId) => {
    setSelectedOrderId(orderId);
    setRejectReason("");
    setIsRejectModalOpen(true);
    // Add class to body to prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Handle Reject action
  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    setPending(pending.filter((item) => item.orderId !== selectedOrderId));
    console.log(
      `Rejected Order ID: ${selectedOrderId} with reason: ${rejectReason}`
    );
    closeRejectModal();
  };

  // Close Reject Modal
  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedOrderId(null);
    setRejectReason("");
    // Restore scrolling when modal is closed
    document.body.style.overflow = '';
  };

  return (
    <div className="card relative">
      <div className="card-header flex justify-between items-center">
  <h2 className="text-xl font-semibold">Recharge Management</h2>
  <button
    onClick={() => navigate(-1)}
    className="btn btn-sm btn-outline-primary flex items-center gap-1"
  >
    <Icon icon="ic:round-arrow-back" className="text-lg" />
    Back
  </button>
</div>

      <div className={`card-body py-8 ${isRejectModalOpen ? 'opacity-50' : ''}`}>
        {/* Pending Recharge Section */}
        <div className="mb-12">
          <h3 className="text-lg font-medium mb-4">Pending Recharges</h3>
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table text-sm w-full">
              <thead>
                <tr>
                  <th className="text-sm">User ID</th>
                  <th className="text-sm">Mobile Number</th>
                  <th className="text-sm">Order ID</th>
                  <th className="text-sm">Amount</th>
                  <th className="text-sm">Create Time</th>
                  <th className="text-sm">Gateway Name</th>
                  <th className="text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.length > 0 ? (
                  pending.map((recharge) => (
                    <tr key={recharge.orderId}>
                      <td>{recharge.userId}</td>
                      <td>{recharge.mobileNumber}</td>
                      <td>{recharge.orderId}</td>
                      <td>{recharge.amount}</td>
                      <td>{recharge.createTime}</td>
                      <td>{recharge.gatewayName}</td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-success radius-8 d-inline-flex align-items-center gap-1"
                            onClick={() => handleSuccess(recharge.orderId)}
                          >
                            <Icon
                              icon="simple-line-icons:check"
                              className="text-xl"
                            />
                            Success
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger radius-8 d-inline-flex align-items-center gap-1"
                            onClick={() => openRejectModal(recharge.orderId)}
                          >
                            <Icon
                              icon="ic:twotone-close"
                              className="text-xl"
                            />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No pending recharges
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Approved Recharge Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Approved Recharges</h3>
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table text-sm w-full">
              <thead>
                <tr>
                  <th className="text-sm">User ID</th>
                  <th className="text-sm">Mobile Number</th>
                  <th className="text-sm">Order ID</th>
                  <th className="text-sm">Amount</th>
                  <th className="text-sm">Gateway Name</th>
                  <th className="text-sm">Success Time</th>
                </tr>
              </thead>
              <tbody>
                {approved.length > 0 ? (
                  approved.map((recharge) => (
                    <tr key={recharge.orderId}>
                      <td>{recharge.userId}</td>
                      <td>{recharge.mobileNumber}</td>
                      <td>{recharge.orderId}</td>
                      <td>{recharge.amount}</td>
                      <td>{recharge.gatewayName}</td>
                      <td>{recharge.successTime}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No approved recharges
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reject Reason Modal - Using fixed positioning with transform for perfect centering */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white rounded-lg shadow-2xl w-full max-w-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Reject Recharge</h3>
              <button
                type="button"
                onClick={closeRejectModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon icon="ic:twotone-close" className="text-2xl" />
              </button>
            </div>
            <div className="mb-6">
              <label
                htmlFor="rejectReason"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reason for Rejection
              </label>
              <textarea
                id="rejectReason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-danger text-sm"
                rows="6"
                placeholder="Enter the reason for rejecting this recharge..."
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={closeRejectModal}
                className="btn btn-sm btn-secondary radius-8 d-inline-flex align-items-center gap-1 px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="btn btn-sm btn-danger radius-8 d-inline-flex align-items-center gap-1 px-4 py-2"
              >
                <Icon icon="ic:twotone-close" className="text-xl" />
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargeManagement;