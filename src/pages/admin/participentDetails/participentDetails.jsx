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
    const [openApproveDialog, setOpenApproveDialog] = useState(false);
    const [openRemarkDialog, setOpenRemarkDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
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

    // Handlers
    const handleOpenApproveDialog = (row) => {
        setSelectedRow(row);
        setOpenApproveDialog(true);
    };

    const handleApprove = async () => {
        console.log("Approved:", selectedRow);
        setOpenApproveDialog(false);

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
        } catch (error) {
            console.error("Error approving payment:", error);
        }
    };

    const handleOpenRemarkDialog = (row) => {
        setSelectedRow(row);
        setOpenRemarkDialog(true);
    };

    const handleSubmitRemark = async () => {
        console.log("Remark submitted for:", selectedRow);
        console.log("Remark:", remark);
        setOpenRemarkDialog(false);

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
        } catch (error) {
            console.error("Error submitting remark:", error);
        }

        setRemark("");
    };

    // Columns configuration
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'contactNumber', headerName: 'Contact', width: 150 },
        { field: 'batch', headerName: 'Batch', width: 100 },
        { field: 'city', headerName: 'City', width: 120 },
        { field: 'country', headerName: 'Country', width: 120 },
        {
            field: 'approve',
            headerName: 'Approve',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOpenApproveDialog(params.row)}
                >
                    Approve
                </Button>
            ),
        },
        {
            field: 'remarks',
            headerName: 'Remarks',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenRemarkDialog(params.row)}
                >
                    Remark
                </Button>
            ),
        },
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

                {/* Approve Dialog */}
                <Dialog open={openApproveDialog} onClose={() => setOpenApproveDialog(false)}>
                    <DialogTitle>Confirm Approval</DialogTitle>
                    <DialogContent>
                        Are you sure you want to approve this payment?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenApproveDialog(false)}>Cancel</Button>
                        <Button onClick={handleApprove} color="success">Approve</Button>
                    </DialogActions>
                </Dialog>

                {/* Remark Dialog */}
                <Dialog open={openRemarkDialog} onClose={() => setOpenRemarkDialog(false)}>
                    <DialogTitle>Submit Remark</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Remark"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            multiline
                            rows={4}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenRemarkDialog(false)}>Cancel</Button>
                        <Button onClick={handleSubmitRemark} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </section>
    );
}
