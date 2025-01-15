import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const number = useParams();
    console.log(number)
    // Fetch data from backend
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://memorylane-2525-be-551279970988.us-central1.run.app/api/v1/register/${number.id}`); // Replace with your API URL
                setUserData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [number.id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Thank you</h2>
            {userData ? (
                <div>
                    <p><strong>Name:</strong> {userData.name || "Biki Karmakar"}</p>
                    <p><strong>Contact No:</strong>{userData.contactNumber}-{userData.contactNumber}</p>
                    <p><strong>Email:</strong> {userData.email || "abc@gmail.com"}</p>
                    <p><strong>Batch:</strong> {userData.batch || "2010"}</p>
                    <p><strong>Address:</strong> {userData.city}, {userData.state}, {userData.country}</p>
                    <p><strong>Registration Status:</strong> {userData.registrationStatus || "AWAITING"}</p>
                    <p><strong>Remarks:</strong> {userData.remarks || "Pending with Admin for approval"}</p>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default UserDetails;
