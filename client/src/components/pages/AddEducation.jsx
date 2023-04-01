import React from 'react'
import { useState } from 'react'
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../features/auth/profileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function AddEducation() {
    const [addEdu , setAddEdu] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    });
    let {school,degree,fieldofstudy,from,current,description,errors,disabled,to} = addEdu
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault();
    
        const eduData = {
          school: school,
          degree: degree,
          fieldofstudy: fieldofstudy,
          from: from,
          to: to,
          current: current,
          description: description
        };
        dispatch(addEducation(eduData))
        navigate('/dashbord')
    }
    const onChange = (e) => {
        setAddEdu((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            
        }))
        //console.log(e.target.name);
    }
    
    const  onCheck = (e) => {
        //console.log(e.target);
        if(e.target){
            setAddEdu({
                disabled: !disabled,
                current: !current
            });
        }
        
        //console.log('yes', current);
    }
    return (
        <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashbord" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={school}
                  onChange={onChange}
                  error={errors?.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={degree}
                  onChange={onChange}
                  error={errors?.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={onChange}
                  error={errors?.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
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
                    value={current}
                    checked={current}
                    onChange={onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  error={errors?.description}
                  info="Tell us about the program that you were in"
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

export default AddEducation
