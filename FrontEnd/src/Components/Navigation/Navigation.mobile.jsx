import { Box, Button } from "@mui/material";
import { Context } from "../../Components/Context/Context.jsx";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';
import TableChartIcon from '@mui/icons-material/TableChart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Navigation.css"
import Cookies from "js-cookie";

const navStyles = {
    active: {
        color: "white",
        background: "#222426"
    },
    inActive: {
        color: "#cdcdcd",
        background: "#151617"
    }
}

const staticData = [
    {
        name: "Employees Info", route: "/employeesInfo", icon: <TableChartIcon sx={{ height: "50%" }} />
    },
    {
        name: "Users Info", route: "/usersInfo", icon: <PersonOutlineIcon sx={{ height: "50%" }} />
    },
    {
        name: "Sheet Info", route: "/sheetInfo", icon: <BorderAllIcon sx={{ height: "50%" }} />
    },
    {
        name: "Groups Info", route: "/groupInfo", icon: <GroupIcon sx={{ height: "50%" }} />
    },
]
const NavigationMobile = () => {
    const { token, setToken, open, setOpen, setIsAdmin, setPermissions, isAdmin } = useContext(Context);
    const logout = () => {
        setToken("");
        Cookies.set("token", "");
        setIsAdmin(false)
        setPermissions({ view: false, edit: false })
    }
    return (
        <Box bgcolor={"#161718"} zIndex={998} position={"fixed"} right={"0"} top={"60px"} p={"20px 10px"} fontSize={"14px"} fontWeight={"600"} height={`calc( 100vh - 50px )`} sx={{ transition: ".3s", transform: !open ? "translateX(100%)" : "translateX(0%)" }} width={"80vw"} boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"} display={["flex", "none"]} flexDirection={"column"} gap={"5px"}>
            {token && <NavLink onClick={() => setOpen(false)}  className={"nav"} to={"/dashboard"} style={({ isActive }) => {
                if (isActive) return navStyles.active;
                else return navStyles.inActive;
            }}>
                <GridViewIcon sx={{ height: "50%" }} />
                <Box>Dashboard</Box>
            </NavLink>}

            {token && staticData.map((item) => {
                if (`${isAdmin ? "/admin" : "/client"}${item.route}` === `${isAdmin ? "/admin" : "/client"}/employeesInfo` && !isAdmin) return <></>
                return (
                    <NavLink onClick={() => setOpen(false)} key={item.route} className={"nav"}  to={`${isAdmin ? "/admin" : "/client"}${item.route}`} style={({ isActive }) => {
                        if (isActive) return navStyles.active;
                        else return navStyles.inActive;
                    }}>
                        {item.icon}
                        {item.name}
                    </NavLink>
                )
            })}
            {!token && <NavLink onClick={() => setOpen(false)} className={"nav"} to={"/login"} style={({ isActive }) => {
                if (isActive) return navStyles.active;
                else return navStyles.inActive;
            }}>
                <LoginIcon sx={{ height: "50%" }} />
                {"Login"}
            </NavLink>}
            {token && <NavLink onClick={logout} className={"nav"} to={"/login"} style={navStyles.inActive}>
                <LogoutIcon sx={{ height: "50%" }} />
                {"Logout"}
            </NavLink>}
        </Box>
    )
}

export default NavigationMobile