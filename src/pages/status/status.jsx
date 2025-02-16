import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {REGISTER_STATUS_URL} from "../../config/api";
import "./status.scss"
import {
    AlertCircle,
    Building,
    Calendar,
    CheckCircle,
    Clock,
    Globe,
    Mail,
    MapPin,
    Phone,
    User,
    Users
} from 'lucide-react';
import {CircularProgress} from "@mui/material";


const UserDetails = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const {id} = useParams();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${REGISTER_STATUS_URL}/${id}`);
            switch (response.status) {
                case 200:
                    setUserData(response.data);
                    break;
                case 204:
                    setErrorMsg("No Records found");
                    break;
                default:
                    setErrorMsg("Unknown Error");
            }
        } catch (err) {
            console.log(err);
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };
    console.log("userData==========", userData)

    const getStatusClass = (status) => {
        switch (status?.toUpperCase()) {
            case 'APPROVED':
                return 'participant-table__status--approved';
            case 'AWAITING APPROVAL':
                return 'participant-table__status--pending';
            default:
                return 'participant-table__status--rejected';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case 'APPROVED':
                return <CheckCircle size={16}/>;
            case 'REJECTED':
                return <AlertCircle size={16}/>;
            default:
                return <Clock size={16}/>;
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="user-details">
            <div className="container">
                {loading && <CircularProgress size={50}/>}
                {errorMsg && <h2>{errorMsg}</h2>}
                {userData &&
                    <div className="card">
                        <div className="card-header">
                            {/* <CheckCircle className="icon-success" /> */}
                            <h3>{userData.name}</h3>
                            <div>
                            <span className={`participant-table__status  ${getStatusClass(userData.approvalStatus)}`}>
                                {getStatusIcon(userData.approvalStatus)}
                                <span className="participant-table__status-value">{userData.approvalStatus}
                                </span>
                            </span>
                            </div>
                        </div>
                        <div className="card-body">
                            <table style={{width: "100%"}}>
                                <tbody>
                                <tr>
                                    <td colSpan="5" style={{position: 'relative'}}>
                                        <div className="participant-table__expand" style={{position: 'relative'}}>
                                            <div className="participant-table__expand-grid">
                                                {/* Personal Information */}
                                                <div className="participant-table__section">
                                                    <h3 className="participant-table__section-title">
                                                        <User size={18}/>
                                                        Personal Information
                                                    </h3>
                                                    <div className="participant-table__section-content">
                                                        <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Email</span>
                                                            <span className="participant-table__field-value">
                                                            <Mail size={16} className="inline mr-2"/> {userData.email}
                                                        </span>
                                                        </div>
                                                        <div className="participant-table__field">
                                                        <span className="participant-table__field-label">
                                                            Gender
                                                        </span>
                                                            <span className="participant-table__field-value">
                                                            <Users size={16} className="inline mr-2"/>{userData.gender}
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contact Information */}
                                                <div className="participant-table__section">
                                                    <h3 className="participant-table__section-title">
                                                        <Phone size={18}/>
                                                        Contact Information
                                                    </h3>
                                                    <div className="participant-table__section-content">
                                                        <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Phone</span>
                                                            <span className="participant-table__field-value">
                                                            +{userData.countryCode} {userData.contactNumber}
                                                        </span>
                                                        </div>
                                                        <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Location</span>
                                                            <span className="participant-table__field-value">
                                                            <MapPin size={16} className="inline mr-6"/>
                                                                {userData.city}, {userData.state}
                                                        </span>
                                                        </div>
                                                        <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Country</span>
                                                            <span className="participant-table__field-value">
                                                            <Globe size={16} className="inline mr-2"/>
                                                                {userData.country}
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Registration Details */}
                                                <div className="participant-table__section">
                                                    <h3 className="participant-table__section-title">
                                                        <Building size={18}/>
                                                        Registration Details
                                                    </h3>
                                                    <div className="participant-table__section-content">
                                                        <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Batch</span>
                                                            <span className="participant-table__field-value">
                                                            Batch {userData.batch}
                                                        </span>
                                                        </div>
                                                        <div className="participant-table__field">
                                                        <span className="participant-table__field-label">
                                                            Registered On</span>
                                                            <span className="participant-table__field-value">
                                                            <Calendar size={16} className="inline mr-2"/>
                                                                {formatDate(userData.registeredOn)}</span>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default UserDetails;
