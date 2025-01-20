import React from 'react';
import "./participantDetails.scss";
import ParticipantManagement from "./participantTable.jsx";


export default function ParticipantDetails() {
    return (
        <section className='details'>
            <div className="container">
                <div className="_pr_details_wrp">
                    <ParticipantManagement/>
                </div>
            </div>
        </section>
    );
}
