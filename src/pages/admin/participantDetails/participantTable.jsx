import React, {useState} from 'react';
import {
    User,
    ChevronDown,
    ChevronUp,
    Mail,
    Phone,
    MapPin,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    Image as ImageIcon,
    MessageSquare,
    Check,
    X,
    Building,
    Globe,
    Users
} from 'lucide-react';
import './participantTable.scss';
import {updateParticipant} from "./apiCall";
import {APPROVAL_STATUS} from "../../../config/constant";

const ParticipantTable = ({participants, onApprove, onReject}) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [remarks, setRemarks] = useState('');

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const getStatusClass = (status) => {
        switch (status.toUpperCase()) {
            case 'APPROVED':
                return 'participant-table__status--approved';
            case 'PENDING':
                return 'participant-table__status--pending';
            default:
                return 'participant-table__status--rejected';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toUpperCase()) {
            case 'APPROVED':
                return <CheckCircle size={16}/>;
            case 'PENDING':
                return <Clock size={16}/>;
            default:
                return <XCircle size={16}/>;
        }
    };

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
        setRemarks('');
    };

    const handleApprove = (participant) => {
        onApprove(participant, remarks);
        setRemarks('');
    };

    const handleReject = (participant) => {
        onReject(participant, remarks);
        setRemarks('');
    };

    return (<div className="participant-table">
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
                    <tr
                        className={`participant-table__row ${expandedRow === index ? 'participant-table__row--expanded' : ''}`}
                        onClick={() => handleRowClick(index)}
                    >
                        <td>{index + 1}.</td>
                        <td>
                            <div className="flex items-center gap-3">
                                <User size={20} className="text-[#C99A46]"/>
                                {participant.name}
                            </div>
                        </td>
                        <td>
                            <span className={`participant-table__status ${getStatusClass(participant.approvalStatus)}`}>
                              {getStatusIcon(participant.approvalStatus)}
                                {participant.approvalStatus}
                            </span>
                        </td>
                        <td>
                            {expandedRow === index ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                        </td>
                    </tr>
                    {expandedRow === index && (
                        <tr>
                            <td colSpan="5">
                                <div className="participant-table__expand">
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
                                  <Mail size={16} className="inline mr-2"/>
                                                        {participant.email}
                                </span>
                                                </div>
                                                <div className="participant-table__field">
                                                            <span
                                                                className="participant-table__field-label">Gender</span>
                                                    <span className="participant-table__field-value">
                                  <Users size={16} className="inline mr-2"/>
                                                        {participant.gender}
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
                                  <MapPin size={16} className="inline mr-2"/>
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
                                                    <span
                                                        className="participant-table__field-value">Batch {participant.batch}</span>
                                                </div>
                                                <div className="participant-table__field">
                                                    <span
                                                        className="participant-table__field-label">Registered On</span>
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
                                                <img
                                                    src={participant.paymentScreenshot}
                                                    alt="Payment"
                                                    className="participant-table__image"
                                                />
                                            </div>)}
                                    </div>

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
                                        <div className="participant-table__actions">
                                            <button
                                                className="participant-table__button participant-table__button--approve"
                                                onClick={() => handleApprove(participant)}
                                            >
                                                <Check size={18}/>
                                                Approved
                                            </button>
                                            <button
                                                className="participant-table__button participant-table__button--reject"
                                                onClick={() => handleReject(participant)}
                                            >
                                                <X size={18}/>
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>)}
                </React.Fragment>))}
                </tbody>
            </table>
        </div>
    </div>);
};

// Example usage component
const ParticipantManagement = () => {
    const [participants, setParticipants] = useState([{
        name: "John Doe",
        email: "john@example.com",
        gender: "Male",
        countryCode: 1,
        contactNumber: 1234567890,
        batch: 2024,
        city: "New York",
        state: "NY",
        country: "USA",
        paymentScreenshot: "/path/to/screenshot.jpg",
        approvalStatus: "PENDING",
        remarks: ["Initial application received"],
        approvedBy: "",
        approvedOn: null,
        registeredOn: new Date("2024-01-15").toISOString()
    }, {
        name: "Jane Smith",
        email: "jane@example.com",
        gender: "Female",
        countryCode: 44,
        contactNumber: 9876543210,
        batch: 2024,
        city: "London",
        state: "England",
        country: "UK",
        paymentScreenshot: "/path/to/screenshot.jpg",
        approvalStatus: "APPROVED",
        remarks: ["Documents verified", "Payment confirmed"],
        approvedBy: "Admin User",
        approvedOn: new Date("2024-01-16").toISOString(),
        registeredOn: new Date("2024-01-14").toISOString()
    }]);

    const handleApprove = async (participant, remarks) => {
        setParticipants(prevParticipants => prevParticipants.map(p => {
            if (p.email === participant.email) {
                return {
                    ...p,
                    approvalStatus: "APPROVED",
                    remarks: [...p.remarks, remarks].filter(Boolean),
                    approvedBy: "Current Admin",
                    approvedOn: new Date().toISOString()
                };
            }
            return p;
        }));
    };

    const handleReject = (participant, remarks) => {
        setParticipants(prevParticipants => prevParticipants.map(p => {
            if (p.email === participant.email) {
                return {
                    ...p, approvalStatus: "REJECTED", remarks: [...p.remarks, remarks].filter(Boolean),
                };
            }
            return p;
        }));
    };

    return (<ParticipantTable
        participants={participants}
        onApprove={handleApprove}
        onReject={handleReject}
    />);
};

export default ParticipantManagement;