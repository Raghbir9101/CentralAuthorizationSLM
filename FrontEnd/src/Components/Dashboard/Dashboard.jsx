import { Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import axios from "../../HTTP"
function Dashboard() {
    let [dashboardData, setDashboardData] = useState([])

    useEffect(() => {
        axios.get(`dashboard`).then(res => setDashboardData(res.data))
    }, [])

    return (
        <Box p={"30px"}>
            <Box>
                <Typography fontSize={"24px"} fontWeight={"600"} textAlign={"center"}>Welcome {dashboardData.userName}</Typography>
                <br />
                <br />
            </Box>
            <Box display={"flex"} gap={"10px"} width={"100%"} justifyContent={"center"} flexDirection={["column", "column", "row", "row"]}>
                {/* <Box width={["100%", "100%", "48%", "48%"]}>
                    <img draggable={false} style={{ width: "100%", borderRadius: "30px" }} src={IMG} alt='none' />
                </Box> */}
                <Box color={"white"} width={["100%", "100%", "48%", "48%"]} display={"flex"} gap={"20px"} flexDirection={"column"}>
                    <Box display={"flex"} gap={"20px"} flexDirection={["column", "row", "row", "row"]}>
                        <Box display={"flex"} flexDirection={"column"} gap={"15px"} p={"20px"} borderRadius={"20px"} width={["100%", "48%", "48%", "48%"]} bgcolor={"#7DA0FA"} minHeight={"125px"}>
                            <Typography fontSize={"13px"}>Total Registered Employees</Typography>
                            <Typography fontSize={"30px"}>  {dashboardData?.employeesCount || 0}</Typography>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} gap={"15px"} p={"20px"} borderRadius={"20px"} width={["100%", "48%", "48%", "48%"]} bgcolor={"#4747A1"} minHeight={"125px"}>
                            <Typography fontSize={"13px"}>Total Users</Typography>
                            <Typography fontSize={"30px"}>  {dashboardData?.clientsCount || 0}</Typography>
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={"20px"} flexDirection={["column", "row", "row", "row"]}>
                        <Box display={"flex"} flexDirection={"column"} gap={"15px"} p={"20px"} borderRadius={"20px"} width={["100%", "48%", "48%", "48%"]} bgcolor={"#7978E9"} minHeight={"125px"}>
                            <Typography fontSize={"13px"}>Total Sheets</Typography>
                            <Typography fontSize={"30px"}>{dashboardData?.toolsCount || 0}</Typography>
                        </Box>
                        <Box fontSize={"13px"} display={"flex"} flexDirection={"column"} gap={"15px"} p={"20px"} borderRadius={"20px"} width={["100%", "48%", "48%", "48%"]} bgcolor={"#F3797E"} minHeight={"125px"}>
                            <Typography fontSize={"13px"}> Total groups_data</Typography>
                            <Typography fontSize={"30px"}>{dashboardData?.groupsCount || 0}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard;