import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoute(prop) {
    if(localStorage.getItem("token")){
        return <Navigate to="/"/>
    }else{
          return prop.children
      }
}

function PublicRouteAdmin(prop) {
    if(localStorage.getItem("admintoken")){
        return <Navigate to="/admin"/>
    }else{
          return prop.children
      }
}


export { PublicRoute,PublicRouteAdmin} 