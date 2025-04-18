import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

// Mock data for demonstration
const withdrawRequests = [
  {
    userId: "USR001",
    mobileNumber: "+91 9876543210",
    orderId: "WD12345",
    withdrawType: "USDT",
    appliedAmount: "100 USDT",
    balanceAfterWithdraw: "50 USDT",
    totalRechargeAmount: "200 USDT",
    totalWithdrawAmount: "150 USDT",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    usdtNetwork: "TRC20",
    usdtAddress: "TX123456789",
    addressAlias: "Wallet1",
    applyDateTime: "2025-04-14 10:30 AM",
  },
  {
    userId: "USR002",
    mobileNumber: "+91 8765432109",
    orderId: "WD12346",
    withdrawType: "Bank",
    appliedAmount: "₹5000",
    balanceAfterWithdraw: "₹10000",
    totalRechargeAmount: "₹20000",
    totalWithdrawAmount: "₹15000",
    bankName: "HDFC Bank",
    accountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    usdtNetwork: "",
    usdtAddress: "",
    addressAlias: "",
    applyDateTime: "2025-04-14 11:00 AM",
  },
];

// Mock gateway list
const gateways = ["Paytm", "Razorpay", "Coinbase", "Bank Transfer"];

const NewWithdraw = () => {
  const [withdraws, setWithdraws] = useState(withdrawRequests);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState("");
  const [rejectRemark, setRejectRemark] = useState("");

  // Mount modal container to body
  useEffect(() => {
    const modalContainer = document.createElement("div");
    modalContainer.id = "modal-root";
    document.body.appendChild(modalContainer);
    console.log("Modal container mounted to body");
    return () => {
      document.body.removeChild(modalContainer);
    };
  }, []);

  // Open Modals
  const openAcceptModal = (orderId) => {
    setSelectedOrderId(orderId);
    setSelectedGateway("");
    setIsAcceptModalOpen(true);
  };

  const openRejectModal = (orderId) => {
    setSelectedOrderId(orderId);
    setRejectRemark("");
    setIsRejectModalOpen(true);
  };

  // Handle Gateway Selection
  const handleGatewaySelect = () => {
    if (!selectedGateway) {
      alert("Please select a gateway.");
      return;
    }
    console.log(
      `Accepted Order ID: ${selectedOrderId} via Gateway: ${selectedGateway}`
    );
    setWithdraws(withdraws.filter((item) => item.orderId !== selectedOrderId));
    setIsAcceptModalOpen(false);
    setSelectedOrderId(null);
    setSelectedGateway("");
  };

  // Handle Reject Submission
  const handleRejectSubmit = () => {
    if (!rejectRemark.trim()) {
      alert("Please provide a remark for rejection.");
      return;
    }
    console.log(
      `Rejected Order ID: ${selectedOrderId} with remark: ${rejectRemark}`
    );
    setWithdraws(withdraws.filter((item) => item.orderId !== selectedOrderId));
    setIsRejectModalOpen(false);
    setSelectedOrderId(null);
    setRejectRemark("");
  };

  // Close Modals
  const closeAcceptModal = () => {
    setIsAcceptModalOpen(false);
    setSelectedOrderId(null);
    setSelectedGateway("");
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedOrderId(null);
    setRejectRemark("");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-semibold">New Withdraw Requests</h2>
      </div>
      <div className="card-body py-8">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table text-sm w-full">
            <thead>
              <tr>
                <th className="text-sm">User ID</th>
                <th className="text-sm">Mobile Number</th>
                <th className="text-sm">Order ID</th>
                <th className="text-sm">Withdraw Type</th>
                <th className="text-sm">Applied Amount</th>
                <th className="text-sm">Balance After</th>
                <th className="text-sm">Total Recharge</th>
                <th className="text-sm">Total Withdraw</th>
                <th className="text-sm">Bank Name</th>
                <th className="text-sm">Account Number</th>
                <th className="text-sm">IFSC Code</th>
                <th className="text-sm">USDT Network</th>
                <th className="text-sm">USDT Address</th>
                <th className="text-sm">Address Alias</th>
                <th className="text-sm">Apply Date & Time</th>
                <th className="text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdraws.length > 0 ? (
                withdraws.map((withdraw) => (
                  <tr key={withdraw.orderId}>
                    <td>{withdraw.userId}</td>
                    <td>{withdraw.mobileNumber}</td>
                    <td>{withdraw.orderId}</td>
                    <td>{withdraw.withdrawType}</td>
                    <td>{withdraw.appliedAmount}</td>
                    <td>{withdraw.balanceAfterWithdraw}</td>
                    <td>{withdraw.totalRechargeAmount}</td>
                    <td>{withdraw.totalWithdrawAmount}</td>
                    <td>{withdraw.bankName || "-"}</td>
                    <td>{withdraw.accountNumber || "-"}</td>
                    <td>{withdraw.ifscCode || "-"}</td>
                    <td>{withdraw.usdtNetwork || "-"}</td>
                    <td>{withdraw.usdtAddress || "-"}</td>
                    <td>{withdraw.addressAlias || "-"}</td>
                    <td>{withdraw.applyDateTime}</td>
                    <td className="text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-success radius-8 d-inline-flex align-items-center gap-1"
                          onClick={() => openAcceptModal(withdraw.orderId)}
                        >
                          <Icon
                            icon="simple-line-icons:check"
                            className="text-xl"
                          />
                          Accept
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger radius-8 d-inline-flex align-items-center gap-1"
                          onClick={() => openRejectModal(withdraw.orderId)}
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
                  <td colSpan="16" className="text-center py-4">
                    No withdraw requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Accept Gateway Modal */}
        {isAcceptModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                width: "100%",
                maxWidth: "28rem",
                padding: "1.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  Select Gateway
                </h3>
                <button
                  type="button"
                  onClick={closeAcceptModal}
                  style={{ color: "#6b7280", fontSize: "1.25rem" }}
                >
                  <Icon icon="ic:twotone-close" />
                </button>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="gateway"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  Payment Gateway
                </label>
                <select
                  id="gateway"
                  value={selectedGateway}
                  onChange={(e) => setSelectedGateway(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                >
                  <option value="">Select a gateway</option>
                  {gateways.map((gateway) => (
                    <option key={gateway} value={gateway}>
                      {gateway}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={closeAcceptModal}
                  className="btn btn-sm btn-secondary radius-8 px-3 py-1.5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleGatewaySelect}
                  className="btn btn-sm btn-success radius-8 px-3 py-1.5"
                >
                  <Icon icon="simple-line-icons:check" style={{ fontSize: "1rem" }} />
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Remark Modal */}
        {isRejectModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                width: "100%",
                maxWidth: "28rem",
                overflow: "hidden",
                position: "relative",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            >
              {/* Header */}
              <div
  style={{
    background: "linear-gradient(to right, #ef4444, #b91c1c)",
    padding: "2px 4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h3 style={{ color: "white", fontSize: "8px", fontWeight: "600" }}>
    Reject Withdrawal
  </h3>


                <button
                  type="button"
                  onClick={closeRejectModal}
                  style={{ color: "white", fontSize: "1.5rem" }}
                >
                  <Icon icon="ic:twotone-close" />
                </button>
              </div>
              {/* Body */}
              <div style={{ padding: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    htmlFor="rejectRemark"
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Reason for Rejection
                  </label>
                  <textarea
                    id="rejectRemark"
                    value={rejectRemark}
                    onChange={(e) => setRejectRemark(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      minHeight: "100px",
                      resize: "none",
                      transition: "box-shadow 0.2s",
                    }}
                    placeholder="Enter reason for rejection..."
                    aria-label="Reason for rejecting withdrawal"
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.2)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button
                    type="button"
                    onClick={closeRejectModal}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#e5e7eb",
                      color: "#374151",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d5db")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectSubmit}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#ef4444",
                      color: "white",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
                  >
                    <Icon icon="ic:twotone-close" style={{ fontSize: "1rem" }} />
                    Confirm
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

export default NewWithdraw;