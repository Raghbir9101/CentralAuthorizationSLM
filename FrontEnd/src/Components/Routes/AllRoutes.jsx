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
      <Route path='/client/login' element={<Login />} />
      <Route path='/client/register' element={<SignUp />} />
      {/* <Route path='/addNewTool' element={!token ? <Navigate to={"/login"} /> : <AddNewTool />} /> */}
      <Route path='/client/tools' element={!token ? <Navigate to={"/client/login"} /> : <Tools />} />
      <Route path='/client/users' element={!token ? <Navigate to={"/client/login"} /> : <Users />} />
      <Route path='/client/groups' element={!token ? <Navigate to={"/client/login"} /> : <Groups />} />
    </Routes>
  )
}

export default AllRoutes


// !token ? <Navigate to={"/login"} /> : 