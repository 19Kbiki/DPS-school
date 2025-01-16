import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material';
import {PARTICIPANTS} from "../../../../config/api";
import {APPROVAL_STATUS} from "../../../../config/constant";
import {DialogComponent} from "./DialogComponent";

export const TableComponent = () => {
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('token'); // Replace with your token retrieval logic
            const response = await fetch(PARTICIPANTS, {
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
            const formattedData =
                data
                    .filter(item => item.name)
                    .map((item, index) => ({
                        id: index + 1,
                        ...item,
                        approvalStatus: item['approvalStatus'] || APPROVAL_STATUS.AWAITING_APPROVAL,
                    }));
            setRows(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data from API
    useEffect(() => {
        fetchData();
    }, []);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    // Function to handle row click
    const handleRowClick = (row) => {
        setSelectedRow(row);
        setOpen(true);
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
                        {rows.map((row) => (
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
            <DialogComponent
                open={open}
                setOpen={setOpen}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
                reloadData={fetchData}
            />
        </>
    );
};
