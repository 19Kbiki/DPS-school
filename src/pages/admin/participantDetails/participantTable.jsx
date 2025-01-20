import React, {useEffect, useRef, useState} from 'react';
import {
    AlertCircle,
    Building,
    Calendar,
    Check,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    Globe,
    Image as ImageIcon,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    User,
    Users,
    X
} from 'lucide-react';
import './participantTable.scss';
import {downloadImage, updateParticipant} from "./apiCall";
import {APPROVAL_STATUS} from "../../../config/constant";
import {PARTICIPANTS} from "../../../config/api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../App";
import {CircularProgress, Typography} from "@mui/material";
import ImageDownloadPlaceholder from "./imageDownloadPlaceholder";

const ParticipantTable = ({participants, onApprove, onReject}) => {
    const imageCache = useRef(new Map());
    const [expandedRow, setExpandedRow] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [paymentSS, setPaymentSS] = useState(null);
    const [isLoadingApprove, setIsLoadingApprove] = useState(false);
    const [isLoadingReject, setIsLoadingReject] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const getStatusClass = (status) => {
        switch (status.toUpperCase()) {
            case 'APPROVED':
                return 'participant-table__status--approved';
            case 'AWAITING APPROVAL':
                return 'participant-table__status--pending';
            default:
                return 'participant-table__status--rejected';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toUpperCase()) {
            case 'APPROVED':
                return <CheckCircle size={16}/>;
            case 'REJECTED':
                return <AlertCircle size={16}/>;
            default:
                return <Clock size={16}/>;
        }
    };

    const handleRowClick = (index) => {
        if (expandedRow !== index) {
            const imageUrl = participants[index]?.paymentScreenshot
            if (imageUrl && imageCache.current.has(imageUrl)) {
                setPaymentSS(URL.createObjectURL(imageCache.current.get(imageUrl)));
            }
        } else {
            setPaymentSS(null);
        }
        setExpandedRow(expandedRow === index ? null : index);
        setRemarks('');
    };

    const handleApprove = async (participant) => {
        if (isLoadingApprove) return;
        setIsLoadingApprove(true);
        try {
            await onApprove(participant, remarks);
            setStatusMessage("Approved Successfully");
        } catch (error) {
            setStatusMessage("Error Approving Request");
        }
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        setIsLoadingApprove(false);
        setRemarks('');

    };

    const handleReject = async (participant) => {
        if (isLoadingReject) return;
        setIsLoadingReject(true);
        try {
            await onReject(participant, remarks);
            setStatusMessage("Rejected Successfully");
        } catch (error) {
            setStatusMessage("Error Rejecting Request");
        }
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        setIsLoadingReject(false);
        setRemarks('');
        // setExpandedRow(null);
    };

    const handleDownloadImage = async (imageUrl) => {
        console.log(`Image Cache ${imageCache} ${imageCache.current.has(imageUrl)}`);
        if (imageCache.current.has(imageUrl)) {
            setPaymentSS(URL.createObjectURL(imageCache.current.get(imageUrl)));
            console.log(`Loading images from cache...`);
        } else {
            const imageBlob = await downloadImage(imageUrl);
            imageCache.current.set(imageUrl, imageBlob);
            console.log(`Image Cache ${imageCache} ${imageCache.current.has(imageUrl)}`);
            setPaymentSS(URL.createObjectURL(imageBlob));
        }
    }

    return (
        <div className="participant-table">
            <h1 className="participant-table__header">Participant Management</h1>
            <div className="participant-table__container">
                <table className="participant-table__table">
                    <thead>
                    <tr>
                        <th>SN no.</th>
                        <th>Participant</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {participants.map((participant, index) => (<React.Fragment key={index}>
                            <tr className={`participant-table__row 
                            ${expandedRow === index ? 'participant-table__row--expanded' : ''}`}
                                onClick={() => handleRowClick(index)}>
                                <td>{index + 1}.</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <User size={20} className="text-[#C99A46] participant-table__user-avatar"/>
                                        {participant.name}
                                    </div>
                                </td>
                                <td>
                                    <span className={`participant-table__status 
                                        ${getStatusClass(participant.approvalStatus)}`}>
                                        {getStatusIcon(participant.approvalStatus)}
                                        <span className="participant-table__status-value">{participant.approvalStatus}
                                        </span>
                                    </span>
                                </td>
                                <td>
                                    {expandedRow === index ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                                </td>
                            </tr>
                            {expandedRow === index && (
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
                                                                <Mail size={16}
                                                                      className="inline mr-2"/> {participant.email}
                                                    </span>
                                                        </div>
                                                        <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Gender</span>
                                                            <span className="participant-table__field-value">
                                                        <Users size={16} className="inline mr-2"/>{participant.gender}
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
                                                        +{participant.countryCode} {participant.contactNumber}
                                                    </span>
                                                        </div>
                                                        <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Location</span>
                                                            <span className="participant-table__field-value">
                                                        <MapPin size={16} className="inline mr-6"/>
                                                                {participant.city}, {participant.state}
                                                    </span>
                                                        </div>
                                                        <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Country</span>
                                                            <span className="participant-table__field-value">
                                                        <Globe size={16} className="inline mr-2"/>
                                                                {participant.country}
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
                                                        Batch {participant.batch}</span>
                                                        </div>
                                                        <div className="participant-table__field">
                                                    <span className="participant-table__field-label">
                                                        Registered On</span>
                                                            <span className="participant-table__field-value">
                                                        <Calendar size={16} className="inline mr-2"/>
                                                                {formatDate(participant.registeredOn)}
                                                    </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Payment Screenshot */}
                                                {participant.paymentScreenshot && (
                                                    <div className="participant-table__section">
                                                        <h3 className="participant-table__section-title">
                                                            <ImageIcon size={18}/>
                                                            Payment Screenshot
                                                        </h3>
                                                        <ImageDownloadPlaceholder paymentSS={paymentSS}
                                                                                  onDownload={() => handleDownloadImage(participant.paymentScreenshot)}/>
                                                    </div>
                                                )}
                                            </div>
                                            {participant.remarks && (
                                                <div className="participant-table__section">
                                                    <h3 className="participant-table__section-title">
                                                        <MessageSquare size={18}/>
                                                        Remarks
                                                    </h3>
                                                    <ul className="participant-details__remarks">
                                                        {participant.remarks.map((remark, index) => (
                                                            <li key={index}>{remark}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {/* Remarks and Actions */}
                                            <div className="participant-table__remarks">
                                                <h3 className="participant-table__section-title">
                                                    <MessageSquare size={18}/>
                                                    Add Remarks
                                                </h3>
                                                <textarea
                                                    className="participant-table__remarks-input"
                                                    value={remarks}
                                                    onChange={(e) => setRemarks(e.target.value)}
                                                    placeholder="Enter your remarks here..."
                                                />
                                                <div>
                                                    {isVisible && (
                                                        <Typography
                                                            variant="body1"
                                                            style={{
                                                                textAlign: 'center',
                                                                backgroundColor: "#E0B757",
                                                                color: "#031102",
                                                                padding: "10px",
                                                                borderRadius: "5px",
                                                                marginBottom: "10px",
                                                                marginTop: "10px",
                                                            }}
                                                        >
                                                            {statusMessage}
                                                        </Typography>
                                                    )}
                                                </div>
                                                <div className="participant-table__actions">
                                                    <button
                                                        disabled={participant.approvalStatus.toUpperCase() === APPROVAL_STATUS.APPROVED}
                                                        className="participant-table__button participant-table__button--approve"
                                                        onClick={() => handleApprove(participant)}
                                                    >
                                                        <Check size={18}/>
                                                        {isLoadingApprove && (<CircularProgress size={20}/>)}
                                                        Approve
                                                    </button>
                                                    <button
                                                        disabled={participant.approvalStatus.toUpperCase() === APPROVAL_STATUS.REJECTED}
                                                        className="participant-table__button participant-table__button--reject"
                                                        onClick={() => handleReject(participant)}
                                                    >
                                                        <X size={18}/>
                                                        {isLoadingReject && (<CircularProgress size={20} color="#C99A46"/>)}
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>)}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Example usage component
const ParticipantManagement = () => {
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('token'); // Replace with your token retrieval logic
            const response = await fetch(PARTICIPANTS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            switch (response.status) {
                case 401:
                    toast.error("Registration is not permitted for your account.");
                    navigate(ROUTES.LOGIN);
                    break;
                default:
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("data----------", data)
            const formattedData =
                data
                    .filter(item => item.name)
                    .map((item, index) => ({
                        id: index + 1,
                        ...item,
                        approvalStatus: item['approvalStatus'] || APPROVAL_STATUS.AWAITING_APPROVAL,
                        remarks: item['remarks'] || [],
                    }));
            setParticipants(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleApprove = async (participant, remarks) => {
        await handleUpdate(participant, APPROVAL_STATUS.APPROVED, remarks);
    };

    const handleReject = async (participant, remarks) => {
        await handleUpdate(participant, APPROVAL_STATUS.REJECTED, remarks);
    };

    const handleUpdate = async (participant, approvalStatus, remarks) => {
        console.log(remarks);
        let updateBody = {
            contactNumber: participant.contactNumber,
            approvalStatus: approvalStatus,
            approvedBy: sessionStorage.getItem('user'),
        };
        // Ensure remarks are added only if it is not empty or null
        if (remarks && remarks.trim().length > 0) {
            updateBody['remarks'] = [...(participant.remarks || []), remarks];
        }
        console.log(updateBody);
        await updateParticipant(updateBody);
        await fetchData();
    }

    // Fetch data from API
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);


    return (<ParticipantTable
        participants={participants}
        onApprove={handleApprove}
        onReject={handleReject}
    />);
};


export default ParticipantManagement;