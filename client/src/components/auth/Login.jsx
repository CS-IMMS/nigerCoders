import React from 'react'
import { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify'
import Spinner from '../layout/Spinner';
import { login } from '../../features/auth/authSlice';
import jwt_decode from 'jwt-decode'
import TextFieldGroup from '../common/TextFieldGroup';
import classNames from 'classnames';


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      })
    
      const {email, password} = formData

    const dispath = useDispatch();
    const navigate = useNavigate();
    
    const { user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )
    const checkRoute = ()=>{
        if(isError){
            toast.error(message.email)
            toast.error(message.password)
            //toast.error('Email or Password incorecte')
        }
        if(isSuccess ){
            navigate('/dashbord')
        }
        dispath(reset())
    }

    useEffect(() =>{
        checkRoute()
    },[isSuccess])

    const handlLogin = async(e) => {
        e.preventDefault()

        const userData = {
            email,
            password
          }
         await dispath(login(userData))
          
    }
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    //let errors = 'userRegister.errors';
    

    //const user = useSelector((state) => state.user)
    
    // let {user} = auth
    if (isLoading){
        return <Spinner/>
    }
    let err = message
    //console.log(err.email);
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form className='form-control' onSubmit={handlLogin}>
                        <div className="form-group py-2">
                                <input type="email" 
                                value={email}
                                 onChange={onChange} 
                                 className={classNames("form-control form-control-lg", {'is-invalid' :err.email}) } 
                                 placeholder="Email Address"
                                  name="email" />
                                  {err.email && (<div className='invalid-feedback'>{err.email}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="password"
                                 value={password}
                                  onChange={onChange}
                                  className={classNames("form-control form-control-lg", {'is-invalid' :err.password}) }
                                    placeholder="password"
                                     name="password" />
                                     {err.password && (<div className='invalid-feedback'>{err.password}</div>)}
                            </div>
                            <div className="from-group text-center">
                                 <input type="submit" className="text-center w-100 btn btn-info btn-block mt-4" />
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
