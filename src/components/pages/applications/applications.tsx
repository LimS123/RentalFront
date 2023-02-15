import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { DataGrid, GridColDef, GridRowsProp, GridSelectionModel } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react"
import { approveApplication, getApplications, host } from "../../../http-routes";

interface IApplication {
    id: string,
    title: string,
    status: boolean,
    createdAtUtc: Date,
    approvedAtUtc: null | Date
}

const Applications: FC = () => {

    const token = localStorage.getItem('token')
    const [applications, setApplications] = useState<IApplication[]>([]);


    useEffect(() => {
        fetch(getApplications(host, 1, 100), {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(items => {
                setApplications(items.applications);
            })
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 310, type: 'string' },
        { field: 'title', headerName: 'Title', width: 300, type: 'string' },
        { field: 'status', headerName: 'Status', width: 150, type: 'boolean' },
        { field: 'createdAtUtc', headerName: 'Created At', width: 210, type: 'string' },
        { field: 'approvedAtUtc', headerName: 'Approved At', width: 210, type: 'string' },
    ];

    const [selectedRow, setSelectedRow] = useState<IApplication | undefined>();

    const handleSelectionModelChange = (ids: GridSelectionModel) => {
        if(ids[0] != undefined){
            setSelectedRow(applications.find(item => item.id == ids[0]));
        }
    }

    const handleSubmitApplication = (id: string) => {
        fetch(approveApplication(host, id), {
            method: "PUT",
            headers: {
                'Content-type' : 'application/json',
                Accept : 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }

    return (
        <>
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid 
                rows={applications}
                columns={columns}
                onSelectionModelChange={(ids) => handleSelectionModelChange(ids)}
                sx={{ml: 27, mr: 27}} 
                 />
        </div>
        <div style={{ height: 200, width: '100%' }}>
            <Box sx={{ml: 27, mr: 27, mt: 5}} >
                <TextField id="standard-basic" sx={{width: 310, mr: 1}} value={selectedRow?.id} variant="standard" />
                <TextField id="standard-basic" sx={{width: 300, mr: 1}} value={selectedRow?.title} variant="standard" />
                <TextField id="standard-basic" sx={{width: 150, mr: 1}} value={selectedRow?.status} variant="standard" />
                <TextField id="standard-basic" sx={{width: 210, mr: 1}} value={selectedRow?.createdAtUtc} variant="standard" />
                <TextField id="standard-basic" sx={{width: 220, mr: 1}} value={selectedRow?.approvedAtUtc} variant="standard" />
                <Button variant="contained" onClick={() => handleSubmitApplication(selectedRow!.id)}>Подтвердить</Button>
            </Box>
        </div>
        </>
        
    )
}

export default Applications