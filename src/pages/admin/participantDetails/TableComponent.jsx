import React, {useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button, List, ListItem, ListItemText,
} from '@mui/material';
import TextField from "@mui/material/TextField";
import {APPROVAL_STATUS} from "../../../config/constant";
import {updateParticipant} from "./apiCall";

export const TableComponent = ({data, reloadData}) => {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [remarks, setRemarks] = useState('');

    const handleApproval = async (approveStatus) => {
        if (!selectedRow) {
            return;
        }
        const updateBody = {
            contactNumber: selectedRow.contactNumber,
            approvalStatus: approveStatus,
            approvedBy: sessionStorage.getItem('user') ,
        }
        await updateParticipant(updateBody);
        await reloadData();
        handleClose();
    };


    const handleSubmitRemark = async () => {
        console.log("Handle Submit Remak called")
        if (!selectedRow || !remarks) {
            return;
        }
        let remarkData = selectedRow.remarks;
        if (!remarkData) {
            remarkData = []
        }
        remarkData.push(remarks);
        const updateBody = {
            contactNumber: selectedRow.contactNumber,
            remarks: remarkData,
        }
        await updateParticipant(updateBody);
        await reloadData();
        handleClose();
    };
    // Function to handle row click
    const handleRowClick = (row) => {
        setSelectedRow(row);
        setOpen(true);
    };
    const handleRemarksChange = (event) => {
        setRemarks(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
        setRemarks('');
        setSelectedRow(null);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Approval Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                hover // Adds hover effect
                                style={{cursor: 'pointer'}} // Makes row appear clickable
                                onClick={() => handleRowClick(row)} // Trigger on row click
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.approvalStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Row Details</DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <div>
                            <p><strong>Name:</strong> {selectedRow.name}</p>
                            <p><strong>Approval Status:</strong> {selectedRow.approvalStatus}</p>
                            {Array.isArray(selectedRow?.remarks) && (
                                <div>
                                    <strong>Remarks:</strong>
                                    <List>
                                        {selectedRow.remarks.map((detail, index) => (
                                            <ListItem key={index}><ListItemText primary={detail}/></ListItem>
                                        ))}
                                    </List>
                                </div>
                            )}
                            {/* TextBox for entering remarks */}
                            <TextField
                                label="Remarks"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={remarks}
                                onChange={handleRemarksChange}
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmitRemark}
                                style={{ marginTop: '10px' }}
                            >Save Remarks</Button>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleApproval(APPROVAL_STATUS.APPROVED)} color="primary">
                        Approve
                    </Button>
                    <Button onClick={() =>handleApproval(APPROVAL_STATUS.REJECTED)} color="primary">
                        Reject
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
