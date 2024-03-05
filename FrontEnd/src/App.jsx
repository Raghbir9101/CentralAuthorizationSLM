import './App.css'
import { Box } from "@mui/material"
import AllRoutes from './Components/Routes/AllRoutes'
import { useContext, useEffect } from 'react';
import { Context } from "./Components/Context/Context.jsx"
import Navigation from './Components/Navigation/Navigation';
import NavigationMobile from './Components/Navigation/Navigation.mobile';
import TopNavbar from './Components/TopNavbar/TopNavbar.jsx';
import axios from "./HTTP.js"

function App() {
  const { navWidth, setTools } = useContext(Context);

  useEffect(() => {
    axios.get(`tools`).then(res => setTools(res.data))
  }, [])
  return (
    <Box width={"100vw"}>
      <TopNavbar />
      <Navigation />
      <NavigationMobile />
      <Box id="padding" sx={{ paddingTop: "60px", paddingLeft: [0, navWidth], transition: ".3s" }}>
        <AllRoutes />
      </Box>
    </Box>
  )
}

export default App
