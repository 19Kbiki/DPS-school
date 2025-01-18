import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Grid,
    Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#C99A46", // Primary Color
        },
        secondary: {
            main: "#E0B757", // Secondary Color
        },
        background: {
            default: "#031102", // Background Color
        },
        text: {
            primary: "#FFFFFF", // Text color
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});

const UserDetails = ({ user }) => {
    return (
        <ThemeProvider theme={theme}>
            <Card
                style={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    margin: "20px auto",
                    maxWidth: "600px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
            >
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                            <Avatar
                                alt={user.name || "User Avatar"}
                                src={user.paymentScreenshot}
                                sx={{
                                    width: 72,
                                    height: 72,
                                    bgcolor: theme.palette.primary.main,
                                }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h5" gutterBottom>
                                {user.name || "No Name Provided"}
                            </Typography>
                            <Typography variant="body1">
                                {user.email || "No Email Provided"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Gender"
                                secondary={user.gender || "Not Specified"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Contact"
                                secondary={`${user.countryCode || ""}-${user.contactNumber || "No Contact"}`}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Batch" secondary={user.batch || "Not Specified"} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Address"
                                secondary={`${user.city || ""}, ${user.state || ""}, ${user.country || ""}`}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Approval Status"
                                secondary={user.approvalStatus || "Pending"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Remarks"
                                secondary={
                                    user.remarks && user.remarks.length > 0 ? (
                                        <List>
                                            {user.remarks.map((remark, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={remark} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        "No Remarks"
                                    )
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Approved By"
                                secondary={user.approvedBy || "Not Approved"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Registered On"
                                secondary={
                                    user.registeredOn
                                        ? new Date(user.registeredOn).toLocaleDateString()
                                        : "Not Registered"
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Approved On"
                                secondary={
                                    user.approvedOn
                                        ? new Date(user.approvedOn).toLocaleDateString()
                                        : "Not Approved"
                                }
                            />
                        </ListItem>
                    </List>
                    <Chip
                        label={`Status: ${user.approvalStatus || "Pending"}`}
                        color="primary"
                        sx={{ marginTop: 2 }}
                    />
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default UserDetails;
