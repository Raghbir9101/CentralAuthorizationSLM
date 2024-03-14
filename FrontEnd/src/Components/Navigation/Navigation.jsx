import { Box, Button } from "@mui/material";
import { Context } from "../../Components/Context/Context.jsx";
import { useContext } from "react";
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
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AppsIcon from '@mui/icons-material/Apps';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
const navStyles = {
    active: {
        color: "white",
        background: "rgb(44 44 44)"
    },
    inActive: {
        color: "#cdcdcd",
        background: "#151617"
    }
}

const staticData = [
    {
        name: "Dashboard", route: "/", icon: <TableChartIcon sx={{ height: "50%" }} />
    },
    {
        name: "Tools", route: "/client/tools", icon: <TableChartIcon sx={{ height: "50%" }} />
    },
    {
        name: "Users", route: "/client/users", icon: <PeopleIcon sx={{ height: "50%" }} />
    },
    {
        name: "Groups", route: "/client/groups", icon: <GroupsIcon sx={{ height: "50%" }} />
    },
]

const Navigation = () => {
    const { isAdmin, setIsAdmin, setPermissions, tools } = useContext(Context);
    const { navWidth, token, setToken, PostToLogs } = useContext(Context);
    const logout = () => {
        setToken("");
        sessionStorage.setItem("token", "");
        setIsAdmin(false)
        setPermissions({ view: false, edit: false })
        // PostToLogs({
        //     activity: `Logged Out.`
        // })
    }
    return (
        <Box bgcolor={"#161718"} className="navigation" zIndex={998} position={"fixed"} left={"0"} top={"60px"} p={"20px 10px"} fontSize={"14px"} fontWeight={"600"} height={`calc( 100vh - 50px )`} sx={{ transition: ".3s" }} width={navWidth} boxShadow={"rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"} display={["none", "flex"]} flexDirection={"column"} gap={"5px"}>

            {/* {token && <NavLink className={"nav"} to={"/addNewTool"} style={({ isActive }) => {
                if (isActive) return navStyles.active;
                else return navStyles.inActive;
            }}>
                <AddBoxIcon sx={{ height: "50%" }} />
                <Box sx={{ display: navWidth == "200px" ? "flex" : "none" }} className="itemText">Add New Tool</Box>

            </NavLink>} */}


            {token && staticData.map((item) => {
                return (
                    <NavLink key={item.toolName} className={"nav"} to={item.route} style={({ isActive }) => {
                        if (isActive) return navStyles.active;
                        else return navStyles.inActive;
                    }}>
                        {item.icon}
                        <Box sx={{ display: navWidth == "200px" ? "flex" : "none" }} className="itemText">{item.name}</Box>
                    </NavLink>
                )
            })}
            {!token && <NavLink className={"nav"} to={"/client/login"} style={({ isActive }) => {
                if (isActive) return navStyles.active;
                else return navStyles.inActive;
            }}>
                <LoginIcon sx={{ height: "50%" }} />
                <Box sx={{ display: navWidth == "200px" ? "flex" : "none" }} className="itemText">Login</Box>
            </NavLink>}
            {/* {(token && isAdmin) && <NavLink className={"nav"} to={"/client/logs"} style={({ isActive }) => {
                if (isActive) return navStyles.active;
                else return navStyles.inActive;
            }}>
                <LocalActivityIcon sx={{ height: "50%" }} />
                <Box sx={{ display: navWidth == "200px" ? "flex" : "none" }} className="itemText">Logs</Box>
            </NavLink>} */}
            {token && <NavLink onClick={logout} className={"nav"} to={"/client/login"} style={navStyles.inActive}>
                <LogoutIcon sx={{ height: "50%" }} />
                <Box sx={{ display: navWidth == "200px" ? "flex" : "none" }} className="itemText">Logout</Box>
            </NavLink>}

        </Box>
    )
}

export default Navigation;