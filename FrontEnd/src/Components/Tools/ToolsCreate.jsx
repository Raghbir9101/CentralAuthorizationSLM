import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useContext } from 'react'
import axios from "../../HTTP.js"
import { Context } from '../Context/Context';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: ["100vw", "40vw"],
    maxHeight: ["80vh"],
    background: "white",
    borderRadius: "20px 0px 0px 20px",
    overflowY: "scroll",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
};


function ToolsCreate({ isOpen, setIsOpen }) {
    const { setTools, ActivateToast } = useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData(e.currentTarget);
            let postData = {
                toolName: formData.get("toolName"),
                toolLink: formData.get("toolLink"),
                toolID: formData.get("toolID"),
                createdOn: new Date().toISOString()
            }
            let { data } = await axios.post(`tools`, postData);
            setTools(prev => [...prev, data])
            setIsOpen(false)
        } catch (error) {
            ActivateToast(error.response.data.error ? "Tool with same name already exist." : "Internal Server Error", "error")
        }

    }
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component="form" onSubmit={handleSubmit} sx={style}>
                <TextField name='toolName' label="Tool Name" required />
                <TextField name='toolID' label="Tool ID" required />
                <TextField name='toolLink' label="Tool Link" required />
                <Button type='submit' sx={{ bgcolor: "#454545", color: "#d6d6d6", "&:hover": { bgcolor: "#454545", color: "white" } }} variant='contained'>Submit</Button>
            </Box>
        </Modal >
    )
}

export default ToolsCreate