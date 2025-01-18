import React from 'react';
import "./participantDetails.scss";
import {TableComponent} from "./components/TableComponent";
import ParticipantManagement from "./participantTable.jsx";


export default function ParticipantDetails() {
    return (
        <section className='details'>
            <div className="container">
                <div className="_pr_details_wrp">
                    <h2>Participant Details</h2>
                    {/*<TableComponent/>*/}
                    <ParticipantManagement/>
                </div>
            </div>
        </section>
    );
}
