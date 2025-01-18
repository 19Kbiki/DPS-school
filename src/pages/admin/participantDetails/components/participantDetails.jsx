import React from 'react';
import './participantDetails.scss';

const ParticipantDetails = ({ participant }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusClassName = (status) => {
        switch (status.toUpperCase()) {
            case 'APPROVED': return 'approved';
            case 'PENDING': return 'pending';
            default: return 'rejected';
        }
    };

    return (
        <div className="participant-details">
            <div className="participant-details__card">
                <div className="participant-details__card-header">
                    <h2>Participant Details</h2>
                </div>

                <div className="participant-details__card-content">
                    <div className="participant-details__grid">
                        {/* Personal Information */}
                        <section className="participant-details__section">
                            <h3 className="participant-details__section-title">Personal Information</h3>
                            <div className="participant-details__section-content">
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">Name:</span>
                                    <span className="participant-details__field-value">{participant.name}</span>
                                </p>
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">Email:</span>
                                    <span className="participant-details__field-value">{participant.email}</span>
                                </p>
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">Gender:</span>
                                    <span className="participant-details__field-value">{participant.gender}</span>
                                </p>
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">Batch:</span>
                                    <span className="participant-details__field-value">{participant.batch}</span>
                                </p>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section className="participant-details__section">
                            <h3 className="participant-details__section-title">Contact Information</h3>
                            <div className="participant-details__section-content">
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">Contact:</span>
                                    <span className="participant-details__field-value">
                    +{participant.countryCode} {participant.contactNumber}
                  </span>
                                </p>
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">City:</span>
                                    <span className="participant-details__field-value">{participant.city}</span>
                                </p>
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">State:</span>
                                    <span className="participant-details__field-value">{participant.state}</span>
                                </p>
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">Country:</span>
                                    <span className="participant-details__field-value">{participant.country}</span>
                                </p>
                            </div>
                        </section>

                        {/* Registration Status */}
                        <section className="participant-details__section">
                            <h3 className="participant-details__section-title">Registration Status</h3>
                            <div className="participant-details__section-content">
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">Status:</span>
                                    <span className={`participant-details__field-value--status ${getStatusClassName(participant.approvalStatus)}`}>
                    {participant.approvalStatus}
                  </span>
                                </p>
                                <p className="participant-details__field">
                                    <span className="participant-details__field-label">Registered On:</span>
                                    <span className="participant-details__field-value">
                    {formatDate(participant.registeredOn)}
                  </span>
                                </p>
                                {participant.approvalStatus === 'APPROVED' && (
                                    <>
                                        <p className="participant-details__field">
                                            <span className="participant-details__field-label">Approved By:</span>
                                            <span className="participant-details__field-value">{participant.approvedBy}</span>
                                        </p>
                                        <p className="participant-details__field">
                                            <span className="participant-details__field-label">Approved On:</span>
                                            <span className="participant-details__field-value">
                        {formatDate(participant.approvedOn)}
                      </span>
                                        </p>
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Remarks */}
                        <section className="participant-details__section">
                            <h3 className="participant-details__section-title">Remarks</h3>
                            <div className="participant-details__section-content">
                                {participant.remarks && participant.remarks.length > 0 ? (
                                    <ul className="participant-details__remarks">
                                        {participant.remarks.map((remark, index) => (
                                            <li key={index}>{remark}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="participant-details__field-value">No remarks available</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Payment Screenshot */}
                    {participant.paymentScreenshot && (
                        <section className="participant-details__section">
                            <h3 className="participant-details__section-title">Payment Screenshot</h3>
                            <div className="participant-details__image-container">
                                <img
                                    src={participant.paymentScreenshot}
                                    alt="Payment Screenshot"
                                    className="participant-details__image-preview"
                                />
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParticipantDetails;