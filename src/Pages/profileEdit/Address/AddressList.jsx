import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisH,
    faHome,
    faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
// import ProfileSideBar from "./ProfileSideBar";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import ProfileSideBar from "../ProfileSideBar";
import axiosInstance from "../../../Api/axiosInstance";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { Dialog } from 'primereact/dialog';
import Button from '@mui/material/Button';

const AddressList = () => {

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [getData, setGetData] = useState([])
    const [deleteId, setDeleteId] = useState(null)
    const [openMenuId, setOpenMenuId] = useState(null);
    const navigate = useNavigate()

    const fetch = async () => {
        try {
            const response = await axiosInstance.get(`/vendor/address`);
            setGetData(response.data);
        } catch (error) {
            console.error("Error fetching invoice:", error);
        }
    };


    useEffect(() => {
        fetch()
    }, [])
    const openDelete = (id) => {
        setDeleteId(id)
        setDeleteDialog(true)
    }
    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/vendor/address/${deleteId}`);
            setDeleteDialog(false)
            fetch()
        } catch (error) {
            console.error("Error fetching invoice:", error);
        }
    }
    const handleEdit = (item) => {
        navigate("/profile_edit/edit_address", { state: { itemData: item } });
    };




    const [state, setState] = useState([])
    const stateFetch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/state`);
            setState(response.data)
        } catch (error) {
            console.error('Error fetching property types:', error);
        }
    }
    useEffect(() => {
        stateFetch()
    }, [])

    return (
        <>
            <div className="container profile_edit">
                <div className="row w-100">
                    <ProfileSideBar />

                    <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
                        <div>
                            <h6>Saved address</h6>
                            <hr />
                        </div>

                        <div className="container mt-4">
                            <div class="card user-data-card mb-3">
                                <div class="card-body">
                                    <Link
                                        to="/profile_edit/add_address"
                                        style={{
                                            fontSize: "16px",
                                            color: "#212529",
                                        }}
                                    >
                                        <div class="single-profile-data d-flex align-items-center justify-content-between">
                                            <div class="title d-flex align-items-center">
                                                <FaPlus className="icon" />
                                                <span>Add New Address</span>
                                            </div>
                                            <div class="data-content">
                                                <FaChevronRight />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {getData?.map((item) => {
                                return (
                                    <div key={item.id} className="card p-3 mb-3 shadow-sm position-relative">
                                        <div className="d-flex align-items-center">
                                            <span className={`icon-bg ${item.type === "Home" ? "home-bg" : "work-bg"}`}>
                                                <FontAwesomeIcon icon={item.type === "Home" ? faHome : faBriefcase} className="text-white" />
                                            </span>
                                            <span className="badge bg-secondary ms-2">{item.type}</span>
                                        </div>
                                        <h6 className="mt-2 mb-1 fw-bold">
                                            No-{item.house_no}, {item.area_colony}, {item.city},  {state.find((s) => s.id === String(item.state))?.state_name || "Unknown State"}, {item.pincode}
                                        </h6>
                                        <p className="mb-2 text-muted">Phone Number: {item.mobile}</p>

                                        <div className="position-absolute end-0 top-0 mt-2 me-3">
                                            <button
                                                className="btn btn-light border-0"
                                                onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                            >
                                                <FontAwesomeIcon icon={faEllipsisH} />
                                            </button>

                                            {openMenuId === item.id && (
                                                <div className="dropdown-menu d-block shadow-sm p-2">
                                                    <button className="dropdown-item" onClick={() => handleEdit(item)}>Edit</button>
                                                    <button className="dropdown-item text-danger" onClick={() => openDelete(item.id)}>Remove</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>

            <Dialog visible={deleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmation" modal onHide={() => setDeleteDialog(false)}>
                <div className="confirmation-content">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span style={{ marginLeft: '10px' }}>Are you sure you want to delete the selected Address</span>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="outlined" color="error" onClick={() => setDeleteDialog(false)}>No</Button>
                        <Button variant="contained" type="button" onClick={handleDelete} > Yes </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default AddressList