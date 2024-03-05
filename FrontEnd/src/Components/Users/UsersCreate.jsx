import { Autocomplete, Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import axios from "../../HTTP.js"
import { Context } from '../Context/Context.jsx';
import { v4 as uuid } from 'uuid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: ["100vw", "60vw"],
    maxHeight: ["80vh"],
    background: "white",
    borderRadius: "20px 0px 0px 20px",
    overflowY: "scroll",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
};


function UsersCreate({ isOpen, setIsOpen, clients, setClients }) {
    const { tools, setTools, ActivateToast } = useContext(Context);
    const [toolsAccess, setToolsAccess] = useState([
        { _id: uuid(), startDate: new Date().toISOString(), endDate: new Date().toISOString(), groupName: "", groupID: "" }
    ])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData(e.currentTarget);
            let postData = {
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                access: toolsAccess
            }
            let { data } = await axios.post(`createUniqueClients`, postData);
            setClients(prev => [...prev, data])
            setIsOpen(false)
        } catch (error) {
            ActivateToast(error.response.data.error ? error.response.data.error : "Internal Server Error", "error")
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
                <TextField name='name' label="Name" required />
                <TextField name='email' label="Email" required />
                <TextField name='password' label="Password" type="Password" required />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                <Box>
                    <Button onClick={() => {
                        setToolsAccess(prev => {
                            return [...prev, { _id: uuid(), startDate: new Date().toISOString(), endDate: new Date().toISOString(), groupName: "", groupID: "" }]
                        })
                    }} variant='contained'>Add</Button>
                </Box>
                {
                    toolsAccess.map((item, index) => (
                        <AccessTable index={index} _id={item._id} setToolsAccess={setToolsAccess} tools={tools} toolsAccess={toolsAccess} />
                    ))
                }
                <Button type='submit' sx={{ bgcolor: "#454545", color: "#d6d6d6", "&:hover": { bgcolor: "#454545", color: "white" } }} variant='contained'>Submit</Button>
            </Box>
        </Modal >
    )
}

export default UsersCreate;


function AccessTable({ tools, toolsAccess, setToolsAccess, index, _id }) {
    const { groups } = useContext(Context);
    const handleAutoCompleteChange = (newVal) => {
        let temp = [...toolsAccess];
        temp[index].groupName = newVal.groupName;
        temp[index].groupID = newVal._id;
        let tempDate = new Date();
        tempDate.setDate(tempDate.getDate() + (360 * newVal.validity))

        temp[index].endDate = tempDate.toISOString();
        setToolsAccess(temp)
    };

    const handleDateChange = (e) => {
        let { value, name } = e.target;
        value = new Date(value).toISOString()
        console.log(value, name)
        let temp = [...toolsAccess];
        temp[index][name] = value;
        setToolsAccess(temp)
    };

    const handleRemoveAccessRow = (e) => {
        if (toolsAccess.length == 1) return;
        setToolsAccess(toolsAccess.filter(item => item._id != _id))
    };
    return <Box display={"flex"} gap={"10px"}>
        <Autocomplete
            sx={{ flex: 2 }}
            options={groups} // Use complete objects as options
            getOptionLabel={(option) => option.groupName} // Display question text
            onChange={(e, newValue) => {
                if (newValue) {
                    handleAutoCompleteChange(newValue);
                }
            }}
            isOptionEqualToValue={(option, value) => {
                // console.log(option, value)
                return option.groupName == value.groupName
            }}
            value={toolsAccess[index]}
            // disableCloseOnSelect
            size='small'
            limitTags={2}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Group"
                    InputProps={{
                        ...params.InputProps,
                        type: "search",
                    }}
                />
            )}
        />
        <TextField sx={{ flex: 1 }} name='startDate' onChange={handleDateChange} size='small' value={convertISOToInputDate(toolsAccess[index].startDate)} label="Start Date" type='date' InputLabelProps={{ shrink: true }} />
        <TextField sx={{ flex: 1 }} name='endDate' onChange={handleDateChange} size='small' value={convertISOToInputDate(toolsAccess[index].endDate)} label="End Date" type='date' InputLabelProps={{ shrink: true }} />
        <Button onClick={handleRemoveAccessRow} variant='contained' sx={{ color: "white", bgcolor: "red", "&:hover": { color: "white", bgcolor: "red" } }} ><DeleteOutlineIcon /></Button>
    </Box>
}

function convertISOToInputDate(isoDateString) {
    var date = new Date(isoDateString);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    var day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}