import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import "./participentDitails.scss";
import { GET_PARTICIPANTS } from '../../../config/Api';

export default function ParticipentDetails() {
    const [rows, setRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [remark, setRemark] = useState("");

    const paginationModel = { page: 0, pageSize: 5 };

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token'); // Replace with your token retrieval logic
                const response = await fetch(GET_PARTICIPANTS, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("data----------", data)
                const formattedData = data.map((item, index) => ({
                    id: index + 1,
                    ...item,
                }));
                setRows(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = (row) => {
        setSelectedRow(row.row);
        setOpenDetailsDialog(true);
    };

    const handleApprove = async () => {
        try {
            const token = sessionStorage.getItem('token');
            await fetch(`/approve/${selectedRow.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "Approved" }),
            });
            console.log("Approved:", selectedRow);
        } catch (error) {
            console.error("Error approving participant:", error);
        }
        setOpenDetailsDialog(false);
    };

    const handleReject = async () => {
        try {
            const token = sessionStorage.getItem('token');
            await fetch(`/reject/${selectedRow.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "Rejected" }),
            });
            console.log("Rejected:", selectedRow);
        } catch (error) {
            console.error("Error rejecting participant:", error);
        }
        setOpenDetailsDialog(false);
    };

    const handleSubmitRemark = async () => {
        try {
            const token = sessionStorage.getItem('token');
            await fetch(`/remark/${selectedRow.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ remark }),
            });
            console.log("Remark submitted for:", selectedRow);
            console.log("Remark:", remark);
        } catch (error) {
            console.error("Error submitting remark:", error);
        }
        setRemark("");
        setOpenDetailsDialog(false);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'contactNumber', headerName: 'Contact', width: 300 },
        { field: 'batch', headerName: 'Batch', width: 200 },
    ];

    return (
        <section className='details'>
            <div className="container">
                <div className="_pr_details_wrp">
                    <h2>Participant Details</h2>
                    <Paper sx={{ width: '100%', bgcolor: "#121C12" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[10]}
                            onRowClick={handleRowClick}
                            sx={{
                                border: 0,
                                color: "#ffffff",
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#004d00",
                                    color: "#000",
                                },
                                "& .MuiDataGrid-row": {
                                    "&:nth-of-type(odd)": {
                                        backgroundColor: "#162415",
                                    },
                                    "&:nth-of-type(even)": {
                                        backgroundColor: "#1C2B1C",
                                    },
                                    color: "#ffffff",
                                    "&:hover": {
                                        backgroundColor: "#2E7D32",
                                    },
                                },
                            }}
                        />
                    </Paper>
                </div>

                {/* Details Dialog */}
                <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)}>
                    <DialogTitle>Participant Details</DialogTitle>
                    <DialogContent>
                        {selectedRow && (
                            <div>
                                <p><strong>Name:</strong> {selectedRow.name}</p>
                                <p><strong>Email:</strong> {selectedRow.email}</p>
                                <p><strong>Contact:</strong> {selectedRow.contactNumber}</p>
                                <p><strong>Batch:</strong> {selectedRow.batch}</p>
                                {selectedRow.image && (
                                    <div>
                                        <img src={selectedRow.paymentScreenshot} alt="Participant" style={{ maxWidth: "100%", marginBottom: "10px" }} />
                                        <Button
                                            variant="outlined"
                                            onClick={() => window.open(selectedRow.image, "_blank")}
                                        >
                                            Download Image
                                        </Button>
                                    </div>
                                )}
                                <TextField
                                    fullWidth
                                    label="Remark"
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    multiline
                                    rows={3}
                                    style={{ marginTop: "20px" }}
                                />
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDetailsDialog(false)}>Cancel</Button>
                        <Button onClick={handleApprove} color="success">Approve</Button>
                        <Button onClick={handleReject} color="error">Reject</Button>
                        <Button onClick={handleSubmitRemark} color="primary">Submit Remark</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </section>
    );
}
