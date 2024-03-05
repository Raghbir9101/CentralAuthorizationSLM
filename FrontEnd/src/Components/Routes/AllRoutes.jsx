import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../Register/Register';
import { Context } from '../Context/Context';
import AddNewTool from '../AddNewTool/AddNewTool';
import Tools from '../Tools/Tools';
import Users from '../Users/Users';
import Groups from '../Groups/Groups';

function AllRoutes() {
  const { token } = useContext(Context)
  return (
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<SignUp />} />
      {/* <Route path='/addNewTool' element={!token ? <Navigate to={"/login"} /> : <AddNewTool />} /> */}
      <Route path='/tools' element={!token ? <Navigate to={"/login"} /> : <Tools />} />
      <Route path='/users' element={!token ? <Navigate to={"/login"} /> : <Users />} />
      <Route path='/groups' element={!token ? <Navigate to={"/login"} /> : <Groups />} />
    </Routes>
  )
}

export default AllRoutes


// !token ? <Navigate to={"/login"} /> : 