import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../Components/Context/Context";
import MenuIcon from '@mui/icons-material/Menu';
import Cookies from "js-cookie";

const TopNavbar = () => {
    const { navWidth, setNavWidth, open, setOpen } = useContext(Context);
    const handleNavWidthChange = () => {
        if (navWidth === "200px") {
            setNavWidth("70px");
            Cookies.set("navWidth", "70px")
        }
        else {
            setNavWidth("200px");
            Cookies.set("navWidth", "200px")
        }
    }
    const handleNavOpen = () => setOpen(p => !p)
    return (
        <Box zIndex={999} position={"fixed"} bgcolor={"#161718"} width={"100%"} top={"0px"} alignItems={"center"} height={"60px"} display={"flex"} justifyContent={["space-between","flex-start"]}>
            <Box height={"100%"} sx={{ transition: ".3s" }} width={navWidth} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <img style={{ height: "30px" }} src="https://i.ibb.co/K00ch0m/CEOITBOX-Logo-Small.png" />
            </Box>
            <IconButton sx={{ marginLeft: "25px", display: ["none", "flex"] }} onClick={handleNavWidthChange}>
                <MenuIcon sx={{color:"white"}} />
            </IconButton>
            <IconButton sx={{ marginLeft: "25px", display: ["flex", "none"] }} onClick={handleNavOpen}>
                <MenuIcon />
            </IconButton>
        </Box>
    )
}

export default TopNavbar;