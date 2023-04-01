import React from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addExperience } from '../../features/auth/profileSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function AddExperience() {
    const [addExp, setAddExp] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    })
    let {company, title, location, from, current, to, description, disabled, errors} = addExp
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const  onSubmit = (e) => {
        e.preventDefault();
    
        const expData = {
          company: company,
          title: title,
          location: location,
          from: from,
          to: to,
          current: current,
          description: description
        };
        console.log(expData)
        //send expData in db
        dispatch(addExperience(expData))
        navigate('/dashbord')
    }
    const onChange = (e) => {
        setAddExp((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            
        }))
        console.log(e.target.name);
    }
    
    const  onCheck = (e) => {
        console.log(e.target);
        if(e.target){
            setAddExp({
                disabled: !disabled,
                current: !current
            });
        }
        
        //console.log('yes', current);
    }
      //const  errors  = errors
    return (
        <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashbord" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={onChange}
                  error={errors?.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  error={errors?.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={onChange}
                  error={errors?.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from || ''}
                  onChange={onChange}
                  error={errors?.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={to}
                  onChange={onChange}
                  error={errors?.to}
                  disabled={disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current || false}
                    checked={current}
                    onChange={onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  error={errors?.description}
                  info="Tell us about the the position"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AddExperience
