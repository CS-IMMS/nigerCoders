import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import jwt_decode from 'jwt-decode'
function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
    window.location.href = '/'
  }
  let decode = ''
  if (user) {
    //console.log(user.token);
    decode = jwt_decode(user.token)

    let { avatar, name, } = decode
    //console.log(decode);
  }
  const authLinks = (
    <>
      <ul className="navbar-nav ml-auto" >
      <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashbord">
            Dashboard
          </Link>
        </li><li className="nav-item">
          <a
            href=""
            onClick={onLogout}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={decode.avatar}
              alt={decode.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image" />{' '}
            Logout
          </a>
        </li>
      </ul>
    </>
  );
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <div className="col-6">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="col-6">
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="profiles"> Developers
                </Link>
              </li>
            </ul>
            {user ? authLinks : guestLinks}

          </div>
        </div>



      </div>
    </nav>
  )
}

export default Navbar
