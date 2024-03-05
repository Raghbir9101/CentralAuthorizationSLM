import React, { useContext, useEffect } from 'react'
import { Context } from '../Context/Context'
import { Navigate, Route } from 'react-router-dom'

function ProtectedRoute({ element, path }) {
    
    return (
        <Route path={path} element={token ? element : <Navigate to={"/login"} />} />
    )
}

export default ProtectedRoute