import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../Context/Context.jsx';
import axios from "../../HTTP.js"

import { DataGrid } from '@mui/x-data-grid';
import ReplayIcon from '@mui/icons-material/Replay';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteConfirmationModal from '../DeleteConfirmation/DeleteConfirmation.jsx';
import UsersEdit from './UsersEdit.jsx';
import UsersCreate from './UsersCreate.jsx';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    padding: "20px",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px"
};

function Users() {
    const { ActivateToast } = useContext(Context);
    const [clients, setClients] = React.useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [filterModel, setFilterModel] = React.useState({
        items: [],
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false);
    const { setGroups } = React.useContext(Context);
    const RenderNormalText = (params) => (
        <Box sx={{ whiteSpace: 'normal' }}>{params.value}</Box>
    );

    const columns = [
        {
            field: '', headerName: 'Edit', width: 70, renderCell: (params) => {
                let data = new Date(params.row.createdOn);
                return (
                    <IconButton sx={{ bgcolor: "green", color: "white", "&:hover": { bgcolor: "#00b700", color: "white" } }} onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(params.row)
                    }}> <EditNoteIcon /> </IconButton>
                )
            }, headerClassName: "muiGridHeader"
        },
        { field: 'name', headerName: 'Name', width: 400, flex: 1, sortable: true, renderCell: RenderNormalText, headerClassName: "muiGridHeader" },
        { field: 'email', headerName: 'Email', width: 400, flex: 1, sortable: true, renderCell: RenderNormalText, headerClassName: "muiGridHeader" },
        {
            field: 'access', headerName: 'Access', minWidth: 100, flex: 1, renderCell: (params) => {
                return (params.row?.access || []).map(item => item.groupName).join(", ")
            }, headerClassName: "muiGridHeader"
        }
    ];

    const handleResetFilter = () => {
        setIsLoading(true)
        axios.get(`clients`).then((res) => {
            setClients(res.data);
            setIsLoading(false);
        });
        axios.get(`groups`).then((res) => {
            setGroups(res.data);
        });
        setFilterModel({ items: [] });
    };

    const handleDelete = async () => {

        let temp = clients.filter(item => !selectionModel.includes(item._id));
        setClients(temp);
        await axios.post(`clients/unique/bulkDelete`, {
            filter: {
                _id: { $in: selectionModel }
            }
        })
    };

    useEffect(() => {
        setIsLoading(true)
        axios.get(`clients`).then((res) => {
            setClients(res.data);
            setIsLoading(false);
        });
        axios.get(`groups`).then((res) => {
            setGroups(res.data);
        });
    }, [])

    return (
        <Box padding={"20px"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box padding={"10px"} display={"flex"} width={"100%"} justifyContent={["flex-start", "flex-start", "space-between", "space-between"]}>
                <Box display={"flex"} gap={"10px"}>
                    <DeleteConfirmationModal onClick={handleDelete} arr={selectionModel} />
                    <Button onClick={handleResetFilter} sx={{ bgcolor: "#454545", color: "#d6d6d6", "&:hover": { bgcolor: "#454545", color: "white" } }} variant="contained" color="primary">
                        <ReplayIcon />
                    </Button>
                    <TextField size='small' label="Search Name" onChange={(e) => {
                        setFilterModel(prev => ({
                            ...prev, items: [
                                { field: 'name', operator: 'contains', value: e.target.value }
                            ]
                        }))
                    }} />
                    <TextField size='small' label="Search Email" onChange={(e) => {
                        setFilterModel(prev => ({
                            ...prev, items: [
                                { field: 'email', operator: 'contains', value: e.target.value }
                            ]
                        }))
                    }} />
                    <TextField size='small' label="Search" onChange={(e) => {
                        setFilterModel(prev => ({ ...prev, quickFilterValues: [e.target.value] }))
                    }} />
                </Box>
                <Button onClick={() => setIsOpen(true)} sx={{ bgcolor: "#454545", color: "#d6d6d6", "&:hover": { bgcolor: "#454545", color: "white" } }} >
                    Add New User
                </Button>
                {isOpen && <UsersCreate clients={clients} setClients={setClients} isOpen={isOpen} setIsOpen={setIsOpen} />}
            </Box>
            {!isLoading &&
                <DataGrid
                    getRowId={(param) => param._id}
                    // onCellKeyDown={handleKeyDown}
                    sx={{ width: "100%", maxHeight: "90vh", minHeight: "90vh" }}
                    rows={clients}
                    columns={columns}
                    checkboxSelection
                    rowsPerPageOptions={[25, 50, 100]}
                    // paginationMode='server'
                    // // slots={{ toolbar: CustomToolbar }}
                    // onRowDoubleClick={handleRowDoubleClick}
                    // disableSelectionOnClick
                    // disableRowSelectionOnClick
                    // componentsProps={{
                    //     filterPanel: { sx: { maxWidth: "90vw" } }
                    // }}
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={(value) => setSelectionModel(value)}
                    onFilterModelChange={(model) => setFilterModel(model)}
                    filterModel={filterModel}
                />}
            {selectedRow && <UsersEdit clients={clients} setClients={setClients} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />}
        </Box>
    )
}

export default Users;