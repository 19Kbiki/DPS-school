import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import "./participantDetails.scss";
import {PARTICIPANTS} from '../../../config/api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {APPROVAL_STATUS} from "../../../config/constant";
import {TableComponent} from "./TableComponent";


export default function ParticipantDetails() {
    const [rows, setRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [remark, setRemark] = useState("");

    const paginationModel = {page: 0, pageSize: 5};
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

    const handleRowClick = (row) => {
        setSelectedRow(row.row);
        setOpenDetailsDialog(true);
    };


    const columns = [
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'email', headerName: 'Email', width: 300},
        {field: 'contactNumber', headerName: 'Contact', width: 300},
        {field: 'batch', headerName: 'Batch', width: 200},
        {
            field: 'approvalStatus',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => {
                switch (params.value) {
                    case 'Approved':
                        return <CheckCircleIcon style={{color: 'green'}}/>;
                    case 'Rejected':
                        return <CancelIcon style={{color: 'red'}}/>;
                    case 'Pending':
                        return <WarningAmberIcon style={{color: 'orange'}}/>;
                    default:
                        return null;
                }
            },
        },
    ];

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <section className='details'>
            <div className="container">
                <div className="_pr_details_wrp">
                    <h2>Participant Details</h2>
                    <TableComponent data={rows} reloadData={fetchData}/>
                </div>
            </div>
        </section>
    );
}
