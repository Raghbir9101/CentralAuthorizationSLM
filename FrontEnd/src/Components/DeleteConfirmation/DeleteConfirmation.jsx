import React, { useContext, useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import { Context } from '../Context/Context';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    padding:"20px",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px"
};
const DeleteConfirmationModal = ({ onClick, arr }) => {
    const [open, setOpen] = useState(false);
    const { ActivateToast } = useContext(Context);
    const handleOpen = () => {
        if(arr.length == 0) return ActivateToast("Please select data to delete !", "error")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // Perform delete operation
        // Add your delete logic here
        onClick()
        setOpen(false);
    };

    

    return (
        <div>
            <Button variant="contained" color="secondary" sx={{ bgcolor: "red", color: "white", "&:hover": { bgcolor: "red", color: "white" } }} onClick={handleOpen}>
                Delete Item
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-confirmation-modal"
                aria-describedby="delete-confirmation-description"
            >
                <div style={modalStyle}>
                    <Typography id="delete-confirmation-modal" variant="h6" component="h2">
                        Delete Confirmation
                    </Typography>
                    <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this item?
                    </Typography>
                    <Button onClick={handleClose} color="primary" sx={{ mt: 2, mr: 2 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained" sx={{ bgcolor: "red", color: "white", mt: 2, "&:hover": { bgcolor: "red", color: "white" } }}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteConfirmationModal;
