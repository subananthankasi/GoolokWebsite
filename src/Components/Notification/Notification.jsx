import {
  fetchNotificationMsg,
  fetchNotificationMsgUpdate,
} from "../../Redux/Action/NotificationAction";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";
import { encryptData } from "../../Utils/encryptData";

function Notification() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationData.notification
  );

  // useEffect(() => {
  //   dispatch(fetchNotificationMsg());

  //   const intervalId = setInterval(() => {
  //     dispatch(fetchNotificationMsg());
  //   }, 2000);

  //   return () => clearInterval(intervalId);
  // }, [dispatch]);


  const navigate = useNavigate();
  const markAsRead = async (id, type, status) => {
    const enid = encryptData(id);
    navigate(`/notification_details/${enid}`);

    const updateData = {
      status: "true",
      id: id,
    };
    try {
      await dispatch(fetchNotificationMsgUpdate(updateData));
    } catch (error) { }
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} mins ago`;

    return `few seconds ago`;
  };

  return (
    // <div>
    <div className="nav-item dropdown">
      {/* <a
        href="#"
        className="nav-link  d-flex align-items-center p-0"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"


      > */}
      <div
        style={{ textAlign: 'center', alignItems: "center" }}
        className="bell-icon-wrapper nav-link  d-block align-items-center p-0"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <NotificationsNoneIcon sx={{ fontSize: 30 }} />
        {/* <h6 className='p-0 mb-0' style={{ fontSize: "14px" }}>Notification</h6> */}
        {notifications.some(
          (notification) => notification.notif_read == "false"
        ) && (
            <>
              <span className="notification-dot"></span>
              <span className="wave-animation"></span>
            </>
          )}
      </div>
      {/* </a> */}

      <ul
        className="dropdown-menu"
        aria-labelledby="navbarDropdown"
        style={{ minWidth: "18rem", padding: "0px", left: "-200px", maxHeight: "400px", overflowY: "scroll" }}
      >
        {notifications.length ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              style={{ padding: "10px 10px" }}
              className={`${notification.notif_read === "false" ? "" : "notread_noti"
                } card m-1`}
              onClick={() =>
                markAsRead(
                  notification.id,
                  notification.notif_type,
                  notification.notif_status
                )
              }
            >
              <div
                className={
                  notification.notif_read === "false" ? "fw-bold" : ""
                }
              >
                <div className="mb-1 d-flex justify-content-between" style={{ fontSize: "13px" }}>
                  {notification.notif_title}
                  <div>

                    {notification.notif_type === "invoice" && (<label className={`badge rounded-pill btn  ${notification.status !== "active" ? "bg-success" : "bg-danger"} `}> {notification.status !== "active" ? "Success" : "Pending"} </label>)}
                  </div>
                </div>
              </div>
              <div
                className="text-dark text-end"
                style={{ fontSize: "11px" }}
              >
                {timeAgo(notification.notif_time)}
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <p className="p-2">No notifications available</p>

          </div>
        )}
      </ul>
    </div>
    // </div>
  );
}

export default Notification;
