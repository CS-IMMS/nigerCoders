import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import claasnames from 'classnames';
import {useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { register,reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Spinner from '../layout/Spinner';
function Register() {
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        password2: '',
        error: {}
      })
    
    const {name, email, password,password2,error} = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
      //console.log(message);
      const navigate = useNavigate()
      const dispatch = useDispatch()
    useEffect(() => {
      if(isSuccess){
        navigate('/login')
      }
      dispatch(reset())
      if (user){
        navigate('/dashbord')
      }

    }, [user,isSuccess])
    
    
    const handlRegister = (e) => {
        e.preventDefault()

        const userData = {
            name,
            email,
            password,
            password2,
            error
          }
        if(password !== password2){
            toast.error('Passwords do not match')
        }else{
           
            //let loginUser = {email, password}
            //console.log(LoginUser); 
            dispatch(register(userData))
            navigate('/login')
        }
        
        
      
    }
    
    
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    let errors = message
     
      //console.log(errors.name);
      if (isLoading){
        <Spinner/>
      }
    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form className='form-control' noValidate onSubmit={handlRegister}>
                            <div className="form-group">
                                <input type="text"
                                    value={name} 
                                    onChange={onChange} 
                                    className={claasnames("form-control form-control-lg", {'is-invalid' :errors.name}) }
                                    placeholder="Name"
                                    name="name" 
                                   
                                />
                                {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="email" 
                                value={email}
                                 onChange={onChange} 
                                 className={claasnames("form-control form-control-lg", {'is-invalid' :errors.email}) } 
                                 placeholder="Email Address"
                                  name="email" />
                                  {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                 value={password}
                                  onChange={onChange}
                                  className={claasnames("form-control form-control-lg", {'is-invalid' :errors.password}) }
                                    placeholder="password"
                                     name="password" />
                                     {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="password"
                                 value={password2} 
                                 onChange={onChange}
                                 className={claasnames("form-control form-control-lg", {'is-invalid' :errors.password2}) }
                                  placeholder="Confirm_Password"
                                   name="password2" />
                                   {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
