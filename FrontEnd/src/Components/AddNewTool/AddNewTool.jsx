import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import axios from "../../HTTP"
import { Context } from '../Context/Context'
function AddNewTool() {
    const { ActivateToast, tools, setTools } = useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        let postData = {
            toolName: formData.get("toolName"),
            toolDatabaseString: formData.get("toolDatabaseString"),
            toolDatabaseCollectionName: formData.get("toolDatabaseCollectionName"),
            toolLink: formData.get("toolLink"),
        }
        console.log(postData)
        await axios.post(`tools`, postData)
        setTools(prev => [...prev, postData])
        ActivateToast("New Tool Added", "success")
    }

    return (
        <Box padding={"20px"} pt={"50px"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} width={"100%"}>
            <Box component={"form"} onSubmit={handleSubmit} padding={"20px"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} width={["100%", "80%", "50%", "40%"]} borderRadius={"40px"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"}>
                <Typography fontWeight={"700"} fontSize={"25px"} >Add New Tool</Typography>
                <TextField
                    fullWidth
                    label="Tool Name"
                    name='toolName'
                />
                <TextField
                    fullWidth
                    label="Tool Database String"
                    name='toolDatabaseString'
                />
                <TextField
                    fullWidth
                    label="Tool Database Collection Name"
                    name='toolDatabaseCollectionName'
                />
                <TextField
                    fullWidth
                    label="Tool Link"
                    name='toolLink'
                />
                <Button variant='contained' type='submit' sx={{ bgcolor: "#2c2c2c", color: "white", "&:hover": { bgcolor: "#2c2c2c", color: "white" } }}>Submit</Button>
            </Box>
        </Box>
    )
}

export default AddNewTool