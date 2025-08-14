import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/home/home";
import Gridview from "./Pages/gridview/gridview";
import Navbar from "./Components/navbar/navbar";
import Footer from "./Components/Footer/footer";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/ScrollToTop";
import PublicRoute from "./Routes/PublicRoute";
import Propertyview from "./Pages/property/propertyview";
import PropertyMap from "./Pages/propertymap/propertymap";
import Tickets from "./Pages/profileEdit/Tickets";
import Dashboard from "./Pages/profileEdit/Dashboard";
import EditProfile from "./Pages/profileEdit/editProfile";
import AddProperty from "./Pages/profileEdit/AddProperty";
import YourProperty from "./Pages/profileEdit/YourProperty";
import Ledger from "./Pages/profileEdit/ledger";
import TicketNotification from "./Pages/profileEdit/ticketNotification";
import AfterLogin from "./Routes/AfterLogin";
import Tracking from "./Pages/profileEdit/Tracking/Tracking";
import NotificationDetails from "./Components/Notification/NotificationDetails";
import ForumHome from "./Pages/Forum/ForumHome";
import Replies from "./Pages/Forum/Replies";
import {
  PaymentFailed,
  PaymentSuccess,
} from "./Pages/PaymentGateway/PaymentResponse";
import PdfDownloadPage from "./Test/PdfDownloadPage";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import PurchaseProperty from "./Pages/profileEdit/PurchaseProperty";
import Mybooking from "./Pages/profileEdit/Mybooking";
import Service from "./Pages/profileEdit/Service";
import BookDetails from "./Pages/profileEdit/BookDetails";
import ServiceDetails from "./Pages/profileEdit/ServiceDetails";
import PaymentHistory from "./Pages/profileEdit/PaymentHistory";
import CustomerCare from "./Pages/profileEdit/customercare";
import Refferals from "./Pages/profileEdit/Refferals";
import AddressList from "./Pages/profileEdit/Address/AddressList";
import CreateAddress from "./Pages/profileEdit/Address/CreateAddress";
import EditAddress from "./Pages/profileEdit/Address/EditAddress";
import CheckoutPage from "./Components/Notification/CheckoutPage";
import { useEffect } from "react";
import { cardGetThunk } from "./Redux/Action/AddToCardThunk";
import { useDispatch } from "react-redux";


//.......

function App() {
const token = localStorage.getItem("zxcvbnm@#");
  const dispatch = useDispatch();
  useEffect(() => {
  if (token) {
    dispatch(cardGetThunk());
  }
}, [token]);
  return (
    <div>
      <BrowserRouter basename="/goolokweb">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<PublicRoute element={Home} />} />
          <Route
            path="/properties/"
            element={<PublicRoute element={Gridview} />}
          />
          <Route
            path="/property/:eid/:landType"
            element={<PublicRoute element={Propertyview} />}
          />
          <Route
            path="/propertymap"
            element={<PublicRoute element={PropertyMap} />}
          />
          <Route path="*" element={<PublicRoute element={NotFound} />} />

          <Route
            path="/notification_details/:deid"
            element={<PublicRoute element={NotificationDetails} />}
          />

          {/* profile  */}
          <Route
            path="/profile_edit/mybooking"
            element={<AfterLogin element={Mybooking} />}
          />
          <Route
            path="/profile_edit/bookdetails/:id"
            element={<AfterLogin element={BookDetails} />}
          />
          <Route
            path="/profile_edit/service"
            element={<AfterLogin element={Service} />}
          />
          <Route
            path="/profile_edit/servicedetails/:eid"
            element={<AfterLogin element={ServiceDetails} />}
          />
          <Route
            path="/profile_edit/tickets"
            element={<AfterLogin element={Tickets} />}
          />
          {/* <Route path="/profile_edit/dashboard" element={<AfterLogin element={Dashboard} />} /> */}

          <Route
            path="/profile_edit/profile"
            element={<AfterLogin element={EditProfile} />}
          />
          <Route
            path="/profile_edit/add_property"
            element={<AfterLogin element={AddProperty} />}
          />
          <Route
            path="/profile_edit/my_property"
            element={<AfterLogin element={YourProperty} />}
          />
          <Route
            path="/profile_edit/paymenthistory"
            element={<AfterLogin element={PaymentHistory} />}
          />
          <Route
            path="/profile_edit/customercare"
            element={<AfterLogin element={CustomerCare} />}
          />
          <Route
            path="/profile_edit/referrals"
            element={<AfterLogin element={Refferals} />}
          />
          <Route
            path="/profile_edit/address"
            element={<AfterLogin element={AddressList} />}
          />
          <Route
            path="/profile_edit/add_address"
            element={<AfterLogin element={CreateAddress} />}
          />
          <Route
            path="/profile_edit/edit_address"
            element={<AfterLogin element={EditAddress} />}
          />

          <Route
            path="/profile_edit/purchase_property"
            element={<AfterLogin element={PurchaseProperty} />}
          />
          <Route
            path="/profile_edit/ledger"
            element={<AfterLogin element={Ledger} />}
          />
          <Route
            path="/profile_edit/notification"
            element={<AfterLogin element={TicketNotification} />}
          />
          <Route
            path="/profile_edit/property_status/:id"
            element={<AfterLogin element={Tracking} />}
          />
          {/* forum   */}
          <Route path="/forum" element={<PublicRoute element={ForumHome} />} />
          <Route path="/replies" element={<PublicRoute element={Replies} />} />

          {/* payment gateway */}
          <Route
            path="/payment_success"
            element={<AfterLogin element={PaymentSuccess} />}
          />
          <Route
            path="/payment_failed"
            element={<AfterLogin element={PaymentFailed} />}
          />

          <Route path="*" element={<PublicRoute element={NotFound} />} />

          {/* test */}
          <Route
            path="/pdf_download"
            element={<AfterLogin element={PdfDownloadPage} />}
          />
          <Route
            path="/CheckoutPage"
            element={<AfterLogin element={CheckoutPage} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
