import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
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

// groups={groups} setGroups={setGroups}
function UsersCreate({ isOpen, setIsOpen, groups, setGroups }) {
    const { tools, setTools, ActivateToast } = useContext(Context);
    const [toolsAccess, setToolsAccess] = useState([
        { _id: uuid(), toolName: "", toolID: "", licenseType: "BASIC" }
    ])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData(e.currentTarget);
            let postData = {
                groupName: formData.get("groupName"),
                validity: formData.get("validity"),
                tools: toolsAccess
            }
            let { data } = await axios.post(`createUniqueGroups`, postData);
            setGroups(prev => [...prev, data])
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
                <Box display={"flex"} gap={"20px"}>
                    <TextField name='groupName' label="Group Name" fullWidth required />
                    <FormControl sx={{ width: "100%", mb: "10px" }}>
                        <InputLabel>Validity</InputLabel>
                        <Select
                            sx={{ width: "100%" }}
                            label={"Validity"}
                            name="validity"
                        >
                            <MenuItem value={"0.083"}>1 Months</MenuItem>
                            <MenuItem value={"0.5"}>6 Months</MenuItem>
                            <MenuItem value={"1"}>1 Year</MenuItem>
                            <MenuItem value={"2"}>2 Years</MenuItem>
                            <MenuItem value={"5"}>5 Years</MenuItem>
                            <MenuItem value={"10"}>10 Years</MenuItem>
                            <MenuItem value={"20"}>20 Years</MenuItem>
                            <MenuItem value={"30"}>30 Years</MenuItem>
                            <MenuItem value={"40"}>40 Years</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/* <Typography sx={{ fontSize: "20px", textAlign: "center" }}>Tools Access</Typography> */}
                <Box>
                    <Button onClick={() => {
                        setToolsAccess(prev => {
                            return [...prev, { _id: uuid(), toolName: "", toolID: "", licenseType: "BASIC" }]
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
    const handleAutoCompleteChange = (newVal) => {
        let temp = [...toolsAccess];
        temp[index].toolName = newVal.toolName;
        temp[index].toolID = newVal.toolID;
        setToolsAccess(temp)
    };

    const handleLicenseTypeChange = (e) => {
        let { value, name } = e.target;
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
            options={tools} // Use complete objects as options
            getOptionLabel={(option) => option.toolName} // Display question text
            onChange={(e, newValue) => {
                if (newValue) {
                    handleAutoCompleteChange(newValue);
                }
            }}
            isOptionEqualToValue={(option, value) => {
                // console.log(option, value)
                return option.toolID == value.toolID
            }}
            value={toolsAccess[index]}
            // disableCloseOnSelect
            size='small'
            limitTags={2}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Tool"
                    InputProps={{
                        ...params.InputProps,
                        type: "search",
                    }}
                />
            )}
        />
        <FormControl  size='small' sx={{ width: "30%" }}>
            <InputLabel>License Type</InputLabel>
            <Select size='small' label={"License Type"} name='licenseType' value={toolsAccess[index]?.licenseType} onChange={handleLicenseTypeChange}>
                <MenuItem value={"BASIC"}>BASIC</MenuItem>
                <MenuItem value={"PRO"}>PRO</MenuItem>
            </Select>
        </FormControl>
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