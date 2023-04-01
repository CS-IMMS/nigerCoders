import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'
import jwtDecode from 'jwt-decode';
import { Link, Navigate } from 'react-router-dom';
import { getProfile, reset } from '../../features/auth/profileSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HandleProfile from './HandleProfile';
import Education from './Education';
import Experience from './Experience';
import { deleteAccount } from '../../features/auth/profileSlice';
import { logout } from '../../features/auth/authSlice';
function Dashboard() {

const { user } = useSelector((state) => state.auth);
const navigate = useNavigate()
const { profile, isLoading, isSuccess, isError, message} = useSelector(
    (state) => state.profile
)
const dispatch = useDispatch()
let dashboardContent;
let decodeUser = jwtDecode(user?.token)


useEffect(() => {
  if(!user){
    navigate('/login')
  }
    if (isError) {
        console.log(message)
    }
    if (isLoading){
        dashboardContent = <Spinner />
    }
    dispatch(getProfile())
    return () => {
        dispatch(reset())
    }
}, [])
const deleteUseandProfile = () =>{
 dispatch(deleteAccount())
 dispatch(reset())
 dispatch(logout())
 navigate('/login')
  // delecte Acount
}
    if (profile === null ) {  
          // User is logged in but has no profile
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome {decodeUser.name}</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          );
    }else if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome  
            <a href={`/user/profile/${profile._id}`} className="text-info" target='_blank'>
            {decodeUser.name}
            </a> 
            </p>
          <HandleProfile/>
          <Experience />
          <Education/>
          <div style={{ marginBottom: '60px' }} />
            <button
              onClick={deleteUseandProfile}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
      )
    }
//     dashboardContent = <Spinner />;
//   } else {

    //Vérifiez si l'utilisateur connecté a des données de profil
    // if (Object.keys(profile).length > 0) {
      
    // } else {

    // }
  //}

    return (
        <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
}

export default Dashboard

 