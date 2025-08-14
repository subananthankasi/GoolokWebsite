import React, { useEffect, useState } from "react";
import ProfileSideBar from "./ProfileSideBar";
import axiosInstance from "../../Api/axiosInstance";

const transactions = [
  {
    date: "21 March 2025",
    time: "8:45 PM",
    invoice: "001",
    name: "Patta",
    amount: "₹ 2000",
    paymentMethod: "Cash",
  },
  {
    date: "20 March 2025",
    time: "9:28 AM",
    invoice: "002",
    name: "Land Servey",
    amount: "₹ 2000",
    paymentMethod: "Transfer",
  },
  {
    date: "19 March 2025",
    time: "7:21 PM",
    invoice: "003",
    name: "Legel Opinion",
    amount: "₹ 2000",
    paymentMethod: "UPI",
  },
  {
    date: "18 March 2025",
    time: "8:45 PM",
    invoice: "004",
    name: "Patta",
    amount: "₹ 2000",
    paymentMethod: "Cash",
  },
  {
    date: "19 March 2025",
    time: "7:21 PM",
    invoice: "005",
    name: "Legel Opinion",
    amount: "₹ 2000",
    paymentMethod: "UPI",
  },
  {
    date: "12 March 2025",
    time: "7:21 PM",
    invoice: "006",
    name: "Patta",
    amount: "₹ 2000",
    paymentMethod: "UPI",
  },
  {
    date: "10 March 2025",
    time: "7:21 PM",
    invoice: "007",
    name: "Land Servey",
    amount: "₹ 2000",
    paymentMethod: "Neft",
  },
  {
    date: "05 March 2025",
    time: "7:21 PM",
    invoice: "008",
    name: "Land Servey",
    amount: "₹ 2000",
    paymentMethod: "Cash",
  },
];



const PaymentHistory = () => {

  const [history, setHistory] = useState([])
  const historyFetch = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/payment`);
      setHistory(response.data)
    } catch (error) {
      console.error('Error fetching property types:', error);
    }
  }
  useEffect(() => {
    historyFetch()
  }, [])
  return (
    <>
      <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar />

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
            <div>
              <h6>Payment History</h6>
              <hr />
            </div>

            <div className="container mt-4">
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Invoice ID</th>
                      <th>Service Name</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, index) => (
                      <tr key={index}>
                        <td style={{minWidth:"100px"}}>
                          {item.created_at}
                          <br />
                          <small className="text-muted">{item.time}</small>
                        </td>
                        <td >{item.invoiceid}</td>
                        <td className="fw-bold">{item.type}</td>
                        <td className="fw-bold">{(item.amount / 100).toFixed(2)}</td>
                        <td className="text-success">{item.method}</td>
                        <td>
                          <button className="btn btn-light border">View More</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
