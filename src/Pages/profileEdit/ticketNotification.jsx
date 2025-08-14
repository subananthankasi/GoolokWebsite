import * as React from "react";
import Box from "@mui/material/Box";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationMsg,
  fetchNotificationMsgUpdate,
} from "../../Redux/Action/NotificationAction";
import { encryptData } from "../../Utils/encryptData";
// import { truncateContent } from "../../Utils/truncateContent";
import ProfileSideBar from "./ProfileSideBar";
import { truncateContent } from "../../Utils/truncateContent";

export default function TicketNotification() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationData.notification
  ) || [];

  React.useEffect(() => {
    dispatch(fetchNotificationMsg());

    const intervalId = setInterval(() => {
      dispatch(fetchNotificationMsg());
    }, 2000);

     return () => clearInterval(intervalId);
  }, [dispatch]);

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

    return `${seconds} seconds ago`;
  };

  return (
    <>
      <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar />

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
            <div>
              <h6>Tickets Notifications</h6>
              <hr />
            </div>
            <div
              className="container"
              style={{ maxHeight: "500px", overflowY: "scroll" }}
            >
              <Box sx={{ width: "100%" }}>
                {notifications.length ? (
                  notifications?.map((notification) => (
                    <div
                      className="card card1"
                      onClick={() =>
                        markAsRead(
                          notification.id,
                          notification.notif_type,
                          notification.notif_status
                        )
                      }
                    >
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-1">
                            <div className="text-center align-item-center bg_icon">
                              <NotificationsActiveIcon />
                            </div>
                          </div>
                          <div className="col-sm-12 col-lg-7">
                            <p
                              className="card-text"
                              style={{ fontSize: "14px" }}
                            >
                              <strong>{notification.notif_title}<span className={`${notification.notif_read === "false" ? "read" : ""
                                }  ms-1`} ></span></strong> -
                              {truncateContent(notification.notif_content, 50)}
                            </p>
                          </div>
                          <div
                            className="col-sm-12 col-lg-4 text-end text-dark"
                            style={{ fontSize: "12px" }}
                          >
                            <p className="card-text">
                              {" "}
                              {timeAgo(notification.notif_time)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-2">No notifications available</p>
                )}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
