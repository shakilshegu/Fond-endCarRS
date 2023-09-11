import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashbord from '../pages/Admin page/Dashbord';
import Loginpage from '../pages/Admin page/Loginpage';
import { Toaster } from "react-hot-toast";
import UserList from '../components/Admin/UserList/UserList';
import PartnerList from '../components/Admin/PartnerList/partnerList';
import Category from'../components/Admin/Category/Category'
import {ProtectedRouteAdmin} from '../utils/ProtectedRoute'
import {PublicRouteAdmin} from '../utils/PublicRoutes'
import Chates from '../components/Admin/Chats/Chates';
import Orders from '../components/Admin/Orders/Orders';
import Dashpage from '../components/Admin/DashBord/Dashbord.jsx'
import Profile from '../components/Admin/Profile/Profile';

function AdminRoute() {
  return (
    <div>
       <Toaster position="top-center" role="status"/>
        <Routes>
        <Route path="/" element={<ProtectedRouteAdmin>{""}<Dashbord />{""}</ProtectedRouteAdmin>} />
        <Route path="/login" element={<PublicRouteAdmin>{""}<Loginpage />{""}</PublicRouteAdmin> } />
        <Route path="/user" element={<ProtectedRouteAdmin>{""}<UserList />{""}</ProtectedRouteAdmin>} />
        <Route path="/partner" element={<PartnerList/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/Chates" element={<Chates/>}/>
        <Route path="/Orders" element={<Orders/>}/>
        <Route path="/DashBord" element={<Dashpage/>}/>
        <Route path="/Profile" element={<Profile/>}/>

      </Routes>
      
    </div>
  )
}

export default AdminRoute
