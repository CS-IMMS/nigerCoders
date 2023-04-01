import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
function Landing() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (user){
    navigate('/dashbord')
  }

  }, [user])
  
  return (
    <>
          <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Developer Connector
                  </h1>
                  <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                  <hr />
                  <Link to="/register" className="btn  btn-info mr-2 mx-2">Sign Up</Link>
                  <Link to="/login" className="btn  btn-light">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
    
  )
}

export default Landing
