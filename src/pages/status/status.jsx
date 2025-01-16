import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {REGISTER_URL} from "../../config/api";
import {Box, Card, CardContent, Divider, Typography} from "@mui/material";

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
                const response = await axios.get(`${REGISTER_URL}/${number.id}`); // Replace with your API URL
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
        <div style={{ padding: "5rem", maxWidth: "800px", margin: "auto" }}>
            {userData ? (
                <div>
                    <UserDetailsCard userData={userData} />
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default UserDetails;


const UserDetailsCard = ({ userData }) => {
    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: "20px auto",
                boxShadow: 3,
                borderRadius: 3,
                padding: 2,
            }}
        >
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                    User Details
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography>
                        <strong>Name:</strong> {userData.name || "Biki Karmakar"}
                    </Typography>
                    <Typography>
                        <strong>Contact No:</strong> {userData.countryCode}-
                        {userData.contactNumber}
                    </Typography>
                    <Typography>
                        <strong>Email:</strong> {userData.email || "abc@gmail.com"}
                    </Typography>
                    <Typography>
                        <strong>Batch:</strong> {userData.batch || "2010"}
                    </Typography>
                    <Typography>
                        <strong>Address:</strong> {userData.city}, {userData.state},{" "}
                        {userData.country}
                    </Typography>
                    <Typography>
                        <strong>Registration Status:</strong>{" "}
                        {userData.registrationStatus || "AWAITING APPROVAL"}
                    </Typography>
                    <Typography>
                        <strong>Remarks:</strong>{" "}
                        {userData.remarks || "Pending with Admin for approval"}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
