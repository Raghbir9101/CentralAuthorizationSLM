import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../Context/Context.jsx';
import axios from "../../HTTP.js"

import { DataGrid } from '@mui/x-data-grid';
import ReplayIcon from '@mui/icons-material/Replay';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ToolsCreate from './ToolsCreate.jsx';
import DeleteConfirmationModal from '../DeleteConfirmation/DeleteConfirmation.jsx';
import ToolsEdit from './ToolsEdit.jsx';

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

function Tools() {
    const { tools, setTools, ActivateToast } = useContext(Context);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [filterModel, setFilterModel] = React.useState({
        items: [],
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false);
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
        {
            field: 'createdOn', headerName: 'Created', width: 100, sortable: true, flex: 1, renderCell: (params) => {
                let data = new Date(params.row.createdOn);
                return (
                    <Box sx={{ whiteSpace: 'normal' }}>{data.toLocaleDateString("in")} {data.toLocaleTimeString()}</Box>
                )
            }, headerClassName: "muiGridHeader"
        },
        { field: 'toolName', headerName: 'Tool Name', width: 400, flex: 2, sortable: true, renderCell: RenderNormalText, headerClassName: "muiGridHeader" },
        { field: 'toolID', headerName: 'Tool ID', width: 400, flex: 2, sortable: true, renderCell: RenderNormalText, headerClassName: "muiGridHeader" },
        {
            field: 'toolLink', headerName: 'Tool Link', minWidth: 100, flex: 1, renderCell: (params) => <a target='_blank' href={params.row.toolLink}>Click Here</a>, headerClassName: "muiGridHeader"
        }
    ];

    const handleResetFilter = () => {
        setIsLoading(true)
        axios.get(`tools`).then((res) => {
            setTools(res.data);
            setIsLoading(false);
        });
        setFilterModel({ items: [] });
    };

    const handleDelete = async () => {

        let temp = tools.filter(item => !selectionModel.includes(item._id));
        setTools(temp);
        await axios.post(`tools/unique/bulkDelete`, {
            filter: {
                _id: { $in: selectionModel }
            }
        })
    };

    useEffect(() => {
        setIsLoading(true)
        axios.get(`tools`).then((res) => {
            setTools(res.data);
            setIsLoading(false);
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
                    <TextField size='small' label="Search Tool" onChange={(e) => {
                        setFilterModel(prev => ({
                            ...prev, items: [
                                { field: 'description', operator: 'contains', value: e.target.value }
                            ]
                        }))
                    }} />
                    <TextField size='small' label="Search" onChange={(e) => {
                        setFilterModel(prev => ({ ...prev, quickFilterValues: [e.target.value] }))
                    }} />
                </Box>
                <Button onClick={() => setIsOpen(true)} sx={{ bgcolor: "#454545", color: "#d6d6d6", "&:hover": { bgcolor: "#454545", color: "white" } }} >
                    Add New Tool
                </Button>
                <ToolsCreate isOpen={isOpen} setIsOpen={setIsOpen} />
            </Box>
            {!isLoading &&
                <DataGrid
                    getRowId={(param) => param._id}
                    // onCellKeyDown={handleKeyDown}
                    sx={{ width: "100%", maxHeight: "90vh", minHeight: "90vh" }}
                    rows={tools}
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
            {selectedRow && <ToolsEdit selectedRow={selectedRow} setSelectedRow={setSelectedRow} />}
        </Box>
    )
}

export default Tools