import axiosInstance from "../../../Api/axiosInstance";
import { DateFormateCustom } from "../../../Utils/DateFormateCustom";
import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import InvoicePaymentGateway from "./InvoicePaymentGateway";
import paid from "../../../assets/images/profile/paid.png"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/images/Goolok Final Logo copy.png"
import DownloadIcon from '@mui/icons-material/Download';

export const InvoicePayment = ({ id, tab }) => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null)

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/vendor/invoice/${id}`);
      setInvoiceData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 3) {
      fetchInvoice();
    }
  }, [tab]);


  const generatePdf = () => {
    const input = contentRef.current;
    if (!input) {
      console.error("contentRef is not available");
      return;
    }

    // input.style.display = "block";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
      // input.style.display = "none";
    });
  };
  const calculateTotals = () => {
    const subtotal = invoiceData?.quentity?.reduce((acc, item) => {
      const chargesTotal = Number(item.amount) || 0;
      return acc + chargesTotal;
    }, 0);
    const gst = subtotal * 0;
    // const total = subtotal + gst;
    const total = subtotal;



    const currencyFormatter = new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      subtotal: currencyFormatter.format(subtotal),
      gst: currencyFormatter.format(gst),
      total: currencyFormatter.format(total),
    };
  };
  return (
    // <div>

    //   {loading ? (
    //     <article className="invoice">
    //       <Skeleton
    //         height={450}
    //         style={{ marginBottom: "10px" }}
    //       />
    //     </article>
    //   ) : invoiceData.quentity === "" || !invoiceData[0] ? (
    //     <div className="text-center mt-5">
    //       <h6 className="fw-bold">Waiting for your Payment...</h6>

    //     </div>
    //   ) :


    //     <article className="invoice">
    //       <h1 className="header--invoice m-auto mb-3">INVOICE</h1>
    //       <header className="headerinvoice">
    //         <h1 className="header--invoice">
    //           <div className="invoice--number">
    //             INVOICE NO :
    //             <span>
    //               <b>{invoiceData.invoice_id}</b>
    //             </span>
    //           </div>
    //           <div className="invoice--date">
    //             {DateFormateCustom(invoiceData.invoice_date)}
    //           </div>
    //         </h1>
    //         <nav className="header--logo">
    //           <div className="header--logo-text">Goolok Pvt ltd</div>
    //           <div className="logo--address">
    //             2nd Floor, 129, <br />
    //             <strong>Nungambakkam, Chennai, </strong>
    //             <br />
    //             <strong>Tamil Nadu 600034</strong>
    //           </div>
    //         </nav>
    //       </header>

    //       <section className="line-items mt-5 mb-5">
    //         <table className="items--table">
    //           <thead>
    //             <tr>
    //               <td>S.NO</td>
    //               <td>Charges</td>
    //               <td>Qty</td>
    //               <td>Fee</td>
    //               <td>Total</td>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {invoiceData.quentity?.map((data, index) => (
    //               <tr key={index}>
    //                 <td>{index + 1}</td>
    //                 <td>{data.remark}</td>
    //                 <td>1</td>
    //                 <td>{data.amount}</td>
    //                 <td>{data.amount}</td>
    //               </tr>
    //             ))}
    //             <tr style={{ borderTop: "1px solid #ece0e0" }}>
    //               <td colSpan={3}></td>
    //               <td className="total-price">Subtotal</td>
    //               <td className="total-price">{invoiceData.amount}</td>
    //             </tr>
    //             <tr>
    //               <td colSpan={3}></td>
    //               <td style={{ borderBottom: "1px solid #ece0e0", fontSize: "11px" }}>
    //                 GST(0%)
    //               </td>
    //               <td style={{ borderBottom: "1px solid #ece0e0", fontSize: "11px" }}>
    //                 00.00
    //               </td>
    //             </tr>
    //             <tr>
    //               <td colSpan={3}></td>
    //               <td className="total-price">Total</td>
    //               <td className="total-price">{invoiceData.amount}</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </section>

    //       <div className="row align-items-center">
    //         <div className="col-7">
    //           <h5>Payment Instructions</h5>
    //           <p>
    //             Ensure to reference Invoice Number <b>{invoiceData.invoice_id}</b> in your payment.
    //             Thank you for your prompt attention to this matter.
    //           </p>
    //         </div>
    //         <div className="col-5 text-end">
    //           {invoiceData.invoice_status == "pending" ?
    //             <InvoicePaymentGateway invoiceData={invoiceData} fetchInvoice={fetchInvoice} /> :
    //             (
    //               <div className="text-end">
    //                 <img
    //                   src={paid}
    //                   style={{ width: "150px", height: "150px" }} />
    //               </div>
    //             )}


    //         </div>
    //       </div>
    //     </article>
    //     // <>
    //     //   <div className='d-flex justify-content-end'>
    //     //     <button className='btn btn-primary' onClick={generatePdf} >
    //     //       <DownloadIcon />
    //     //     </button>
    //     //   </div>

    //     //   <article className="p-4" ref={contentRef} style={{ background: "#fff", }} >
    //     //     <h3 className="text-center" style={{ fontWeight: "800" }}> INVOICE </h3>
    //     //     <hr />
    //     //     <div className="d-flex justify-content-between ">
    //     //       <div className="mt-3 mb-5">
    //     //         <img src={logo} alt="goolok" style={{ width: "100px", height: "25px" }} />
    //     //         <div className="m-0">
    //     //           <p className='p-0 m-0' style={{ fontSize: "11px" }}><b>  Goolok Pvt ltd </b></p>
    //     //           <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>2nd Floor, 129,</b></p>
    //     //           <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Nungambakkam, Chennai,</b> </p>
    //     //           <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Tamil Nadu 600034 </b></p>
    //     //         </div>
    //     //       </div>
    //     //       {/* {invoiceData?.map((item) => {
    //     //         return ( */}
    //     //       <div className="mt-3 mb-5">
    //     //         <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>Invoice no : </b> {invoiceData.invoice_id}  </p>
    //     //         <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Name: </b> {invoiceData.customer}  </p>
    //     //         <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Date:</b> {invoiceData.invoice_date} </p>
    //     //         <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Email:</b>{invoiceData.email_id} </p>
    //     //         <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Mobile:</b>{invoiceData.mobile} </p>

    //     //       </div>
    //     //       {/* )
    //     //        })} */}

    //     //     </div>
    //     //     <section className="line-items  ">
    //     //       <table className="items--table w-100 mt-5 p-2 table-bordered">
    //     //         <thead className="p-1">
    //     //           <tr className="p-1">
    //     //             <th className="p-1 text-center" style={{ fontSize: "11px" }}>S.NO</th>
    //     //             <th className='text-center' style={{ fontSize: "11px" }}>Qty</th>
    //     //             <th className='text-center' style={{ fontSize: "11px" }}>Description</th>
    //     //             <th className='text-center' style={{ fontSize: "11px" }}>Advance Payment</th>
    //     //           </tr>
    //     //         </thead>
    //     //         <tbody>
    //     //           {invoiceData?.quentity?.map((item, index) => (
    //     //             <>
    //     //               <tr className="p-1">
    //     //                 <td className="p-1 text-center" style={{ fontSize: "11px" }}> 1</td>
    //     //                 <td className='text-center' style={{ fontSize: "11px" }}>1</td>
    //     //                 <td className='text-center' style={{ fontSize: "11px" }}>{item.remark} </td>
    //     //                 <td className='text-center' style={{ fontSize: "11px" }}>₹ {item.amount} </td>
    //     //               </tr>
    //     //             </>
    //     //           ))}

    //     //         </tbody>
    //     //         <tfoot>
    //     //           <tr>
    //     //             <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}>Sub Total</td>
    //     //             <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>{calculateTotals().subtotal} </td>
    //     //           </tr>
    //     //           <tr>
    //     //             <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}> GST(0%)</td>
    //     //             <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>0.00 </td>
    //     //           </tr>
    //     //           <tr>
    //     //             <td colSpan="3" className='text-end p-1' style={{ fontWeight: "600", fontSize: "11px" }}>Total</td>
    //     //             <td colSpan="2" className='text-center' style={{ fontWeight: "600", fontSize: "11px" }}>{calculateTotals().total} </td>
    //     //           </tr>

    //     //         </tfoot>
    //     //       </table>
    //     //       <div className="mt-5 mb-5 w-50">
    //     //         <p className="p-0 m-0 fw-bold">Terms & Conditions</p>
    //     //         <p className='p-0 m-0' style={{ fontSize: "11px" }}>payment deadlines, acceptable payment methods, late payment penalties, and other important clauses.</p>
    //     //       </div>
    //     //       <div className="mt-5">
    //     //         <h4 className="text-center mt-5">Thank You For Your Bussiness ! </h4>
    //     //       </div>
    //     //     </section>

    //     //   </article>

    //     // </>
    //   }
    // </div>



    <div>

      {loading ? (
        <article className="invoice">
          <Skeleton height={450} style={{ marginBottom: "10px" }} />
        </article>
      ) : !invoiceData.quentity || invoiceData.quentity.length === 0 ? (
        <div className="text-center mt-5">
          <h6 className="fw-bold">Waiting for your Payment...</h6>
        </div>
      ) : (
        <>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={generatePdf} >
              <DownloadIcon />
            </button>
          </div>

          <article className="p-4" ref={contentRef} style={{ background: "#fff", }} >
            <h3 className="text-center" style={{ fontWeight: "800" }}> INVOICE </h3>
            <hr />
            <div className="d-flex justify-content-between ">
              <div className="mt-3 mb-5">
                <img src={logo} alt="goolok" style={{ width: "100px", height: "25px" }} />
                <div className="m-0">
                  <p className='p-0 m-0' style={{ fontSize: "11px" }}><b>  Goolok Pvt ltd </b></p>
                  <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>2nd Floor, 129,</b></p>
                  <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Nungambakkam, Chennai,</b> </p>
                  <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Tamil Nadu 600034 </b></p>
                </div>
              </div>
              {/* {invoiceData?.map((item) => {
                return ( */}
              <div className="mt-3 mb-5">
                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>Invoice no : </b> {invoiceData.invoice_id}  </p>
                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Name: </b> {invoiceData.customer}  </p>
                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Date:</b> {invoiceData.invoice_date} </p>
                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Email:</b>{invoiceData.email_id} </p>
                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Mobile:</b>{invoiceData.mobile} </p>

              </div>
              {/* )
               })} */}

            </div>
            <section className="line-items  ">
              <table className="items--table w-100 mt-5 p-2 table-bordered">
                <thead className="p-1">
                  <tr className="p-1">
                    <th className="p-1 text-center" style={{ fontSize: "11px" }}>S.NO</th>
                    <th className='text-center' style={{ fontSize: "11px" }}>Qty</th>
                    <th className='text-center' style={{ fontSize: "11px" }}>Description</th>
                    <th className='text-center' style={{ fontSize: "11px" }}>Advance Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData?.quentity?.map((item, index) => (
                    <>
                      <tr className="p-1">
                        <td className="p-1 text-center" style={{ fontSize: "11px" }}> 1</td>
                        <td className='text-center' style={{ fontSize: "11px" }}>1</td>
                        <td className='text-center' style={{ fontSize: "11px" }}>{item.remark} </td>
                        <td className='text-center' style={{ fontSize: "11px" }}>₹ {item.amount} </td>
                      </tr>
                    </>
                  ))}

                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}>Sub Total</td>
                    <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>{calculateTotals().subtotal} </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}> GST(0%)</td>
                    <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>0.00 </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className='text-end p-1' style={{ fontWeight: "600", fontSize: "11px" }}>Total</td>
                    <td colSpan="2" className='text-center' style={{ fontWeight: "600", fontSize: "11px" }}>{calculateTotals().total} </td>
                  </tr>

                </tfoot>
              </table>
              <div className="mt-5 mb-5 w-50">
                <p className="p-0 m-0 fw-bold">Terms & Conditions</p>
                <p className='p-0 m-0' style={{ fontSize: "11px" }}>payment deadlines, acceptable payment methods, late payment penalties, and other important clauses.</p>
              </div>

              <div >
                {invoiceData.invoice_status == "pending" ?
                  <InvoicePaymentGateway invoiceData={invoiceData} fetchInvoice={fetchInvoice} /> :
                  (
                    <div className="mt-5">
                      <h4 className="text-center mt-5">Thank You For Your Bussiness ! </h4>
                    </div>
                  )}


              </div>

            </section>

          </article>

        </>
      )}
    </div>

  );
};
