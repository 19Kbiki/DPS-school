import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {REGISTER_STATUS_URL} from "../../config/api";
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
                const response = await axios.get(`${REGISTER_STATUS_URL}/${number.id}`); // Replace with your API URL
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
        <div style={{padding: "5rem", margin: "auto"}}>
            {userData ? (
                <div>
                    <UserDetailsCard userData={userData}/>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default UserDetails;


const UserDetailsCard = ({userData}) => {
    const userDetails = [
        {label: "Name", value: userData.name || "Biki Karmakar"},
        {label: "Contact No", value: `${userData.countryCode}-${userData.contactNumber}`},
        {label: "Email", value: userData.email || "abc@gmail.com"},
        {label: "Batch", value: userData.batch || "2010"},
        {label: "Address", value: `${userData.city}, ${userData.state}, ${userData.country}`},
        {label: "Registration Status", value: userData.registrationStatus || "AWAITING APPROVAL"},
        {label: "Remarks", value: userData.remarks || "Pending with Admin for approval"},
    ];
    return (
        <Card
            sx={{
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
                <Divider sx={{marginBottom: 2}}/>
                <Box>
                    <div className="details_wrp">
                        {userDetails.map(({label, value}, index) => (
                            <Typography key={index}>
                                <strong>{label}:</strong> {value}
                            </Typography>
                        ))}

                    </div>
                </Box>
            </CardContent>
        </Card>
    );
};
