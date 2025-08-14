import React, { useEffect, useRef, useState } from 'react'
import { PaymentSuccess } from '../../PaymentGateway/PaymentResponse';
import axiosInstance from '../../../Api/axiosInstance';
import { encryptData } from '../../../Utils/encryptData';
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/images/Goolok Final Logo copy.png"
import DownloadIcon from '@mui/icons-material/Download';


const AdvancePayment = ({ id }) => {
    const [data, setData] = useState({});
    const [invoiceData, setInvoiceData] = useState([])
    const contentRef = useRef();
    const navigate = useNavigate()


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
        const subtotal = invoiceData?.reduce((acc, item) => {
            const chargesTotal = item.advance?.amount

            return acc + (chargesTotal || 0);
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
    const fetch = async () => {
        try {
            const response = await axiosInstance.get(`/vendor/enquiry/${id}`);
            setData(response.data);
            setInvoiceData(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (id) {
            fetch();
        }
    }, [id]);

    return (
        <div>
            {/* {
                data[0]?.advance === null ? (
                    <div className="text-center mt-5">
                        <h6 className="fw-bold">Waiting for your Advance Payment...</h6>

                    </div>
                ) :
                    data[0]?.advance?.status === "pending" ? (
                        <div className="row">
                            <div className="mt-3 mt-md-0">
                                <section className="car d p-4 cardheight">
                                    <div>
                                        Complete your payment of{" "}
                                        <b>₹{data[0]?.advance?.amount}</b> to proceed
                                        with your property consultation. Our experts
                                        will assist you in finding your ideal property
                                        quickly and efficiently.
                                    </div>
                                    <div className="text-center">
                                        <button
                                            className="btn  mt-3 text-white"
                                            style={{
                                                backgroundColor: "#2f4f4f",
                                                minWidth: "200px",
                                            }}
                                            onClick={() => {
                                                navigate(
                                                    `/notification_details/${encryptData(
                                                        data[0]?.advance?.id
                                                    )}`
                                                );
                                            }}
                                        >
                                            Proceed
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    ) : (
                        // <PaymentSuccess />
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
                                    {invoiceData?.map((item, index) => {
                                        return (
                                            <div className="mt-3 mb-5" key={index}>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>Invoice no : </b> {item.advance?.invoice_id}  </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Name: </b> {item.customer}  </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Date:</b> {item.advance?.invoice_date} </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Email:</b>{item.email_id} </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Mobile:</b>{item.mobile} </p>

                                            </div>
                                        )
                                    })}

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
                                            {invoiceData?.map((item, index) => (

                                                <tr className="p-1" key={index}>
                                                    <td className="p-1 text-center" style={{ fontSize: "11px" }}> 1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>Advance payment</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>₹ {item.advance?.amount} </td>
                                                </tr>

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
                                    <div className="mt-5">
                                        <h4 className="text-center mt-5">Thank You For Your Bussiness ! </h4>
                                    </div>
                                </section>

                            </article>

                        </>
                    )
            } */}
            {
                data[0]?.advance === null ? (
                    <div className="text-center mt-5">
                        <h6 className="fw-bold">Waiting for your Advance Payment...</h6>

                    </div>
                ) :
                    (
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
                                    {invoiceData?.map((item, index) => {
                                        return (
                                            <div className="mt-3 mb-5" key={index}>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>Invoice no : </b> {item.advance?.invoice_id}  </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Name: </b> {item.customer}  </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Date:</b> {item.advance?.invoice_date} </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Email:</b>{item.email_id} </p>
                                                <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Mobile:</b>{item.mobile} </p>

                                            </div>
                                        )
                                    })}

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
                                            {invoiceData?.map((item, index) => (

                                                <tr className="p-1" key={index}>
                                                    <td className="p-1 text-center" style={{ fontSize: "11px" }}> 1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>Advance payment</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>₹ {item.advance?.amount} </td>
                                                </tr>

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
                                    {data[0]?.advance?.status === "pending" ? (
                                        <div className="row">
                                            <div className="mt-3 mt-md-0">
                                                <section className="car d p-4 cardheight">
                                                  
                                                    <div className="text-center">
                                                        <button
                                                            className="btn  mt-3 text-white"
                                                            style={{
                                                                backgroundColor: "#2f4f4f",
                                                                minWidth: "200px",
                                                            }}
                                                            onClick={() => {
                                                                navigate(
                                                                    `/notification_details/${encryptData(
                                                                        data[0]?.advance?.id
                                                                    )}`
                                                                );
                                                            }}
                                                        >
                                                            Pay {data[0]?.advance?.amount}
                                                        </button>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-5">
                                            <h4 className="text-center mt-5">Thank You For Your Bussiness ! </h4>
                                        </div>
                                    )

                                    }


                                </section>

                            </article>

                        </>
                    )
            }
        </div>
    )
}

export default AdvancePayment