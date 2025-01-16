import {Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText} from "@mui/material";
import TextField from "@mui/material/TextField";
import {APPROVAL_STATUS} from "../../../../config/constant";
import React, {useState} from "react";
import {updateParticipant} from "../apiCall";

export function DialogComponent({open, setOpen, selectedRow, setSelectedRow, reloadData}) {
    const handleApproval = async (approveStatus) => {
        if (!selectedRow) {
            return;
        }
        const updateBody = {
            contactNumber: selectedRow.contactNumber,
            approvalStatus: approveStatus,
            approvedBy: sessionStorage.getItem('user'),
        }
        await updateParticipant(updateBody);
        await reloadData();
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Row Details</DialogTitle>
            <BDialogContent selectedRow={selectedRow} reloadData={reloadData} handleClose={handleClose} />
            <DialogActions>
                <Button onClick={() => handleApproval(APPROVAL_STATUS.APPROVED)} color="primary">
                    Approve
                </Button>
                <Button onClick={() => handleApproval(APPROVAL_STATUS.REJECTED)} color="primary">
                    Reject
                </Button>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

function BDialogContent({selectedRow, reloadData, handleClose}) {
    const [remarks, setRemarks] = useState('');

    const handleRemarksChange = (event) => {
        setRemarks(event.target.value);
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
        setRemarks('');
    };

    return (
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
                        style={{marginTop: '10px'}}
                    >Save Remarks</Button>
                </div>
            )}
        </DialogContent>
    );
}