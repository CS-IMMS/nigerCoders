import React from 'react'
import { useState, useEffect } from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/inputGroup'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { useDispatch } from 'react-redux'
import { createProfile, reset } from '../../features/auth/profileSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Spinner from '../layout/Spinner'
export default function CreateProfile() {

    const [dataProfile, setDataProfile] = useState({
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    })
    const { handle,company,website,location,status,skills,githubusername,bio,twitter,facebook,linkedin,youtube,instagram } = dataProfile


    const { profile, isLoading, isSuccess, isError, message} = useSelector(
        (state) => state.profile
    )
    let affichage =''
    const navigate = useNavigate()
    useEffect(() => {
      
        if (isError) {
            toast.error(message)
        }
        if(isLoading){
            affichage = <Spinner/>
        }
        if(isSuccess){
            navigate('/dashbord')
        }
      }, [])
    const onChange = (e) => {
        setDataProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            
        }))
        //console.log(e.target.name);
    }
    const dispath = useDispatch()
    const onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
            handle: handle,
            company: company,
            website: website,
            location: location,
            status: status,
            skills: skills,
            githubusername: githubusername,
            bio: bio,
            twitter: twitter,
            facebook: facebook,
            linkedin: linkedin,
            youtube: youtube,
            instagram: instagram
        };
        console.log(profileData);
        dispath(createProfile(profileData))
        //props.createProfile(profileData, props.history);
    }
    if(profile){
       //console.log(profile); 
       navigate('/dashbord')
    }

        // Select options for status
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
        ];
    
    const {  displaySocialInputs } = dataProfile;
    let errors = message
    let socialInputs;
    if (displaySocialInputs) {
        socialInputs = (
          <div>
            <InputGroup
              placeholder="Twitter Profile URL"
              name="twitter"
              icon="fab fa-twitter"
              value={twitter || ''}
              onChange={onChange}
              error={errors.twitter}
            />
  
            <InputGroup
              placeholder="Facebook Page URL"
              name="facebook"
              icon="fab fa-facebook"
              value={facebook || ''}
              onChange={onChange}
              error={errors.facebook}
            />
  
            <InputGroup
              placeholder="Linkedin Profile URL"
              name="linkedin"
              icon="fab fa-linkedin"
              value={linkedin || ''}
              onChange={onChange}
              error={errors.linkedin}
            />
  
            <InputGroup
              placeholder="YouTube Channel URL"
              name="youtube"
              icon="fab fa-youtube"
              value={youtube || ''}
              onChange={onChange}
              error={errors.youtube}
            />
  
            <InputGroup
              placeholder="Instagram Page URL"
              name="instagram"
              icon="fab fa-instagram"
              value={instagram || ''}
              onChange={onChange}
              error={errors.instagram}
            />
          </div>
        );
      }
      affichage = (
        <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Create Your Profile</h1>
                        <p className="lead text-center">
                            Let's get some information to make your profile stand out
                        </p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={handle || ''}
                                onChange={onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your full name, company name, nickname"
                            />
                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={status || ''}
                                onChange={onChange}
                                options={options}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={company || ''}
                                onChange={onChange}
                                error={errors.company}
                                info="Could be your own company or one you work for"
                            />
                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={website || ''}
                                onChange={onChange}
                                error={errors.website}
                                info="Could be your own website or a company one"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={location || ''}
                                onChange={onChange}
                                error={errors.location}
                                info="City or city & state suggested (eg. Boston, MA)"
                            />
                            <TextFieldGroup
                                placeholder="* Skills"
                                name="skills"
                                value={skills || ''}
                                onChange={onChange}
                                error={errors.skills}
                                info="Please use comma separated values (eg.
                  HTML,CSS,JavaScript,PHP"
                            />
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={githubusername || ''}
                                onChange={onChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link, include your username"
                            />
                            <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={bio || ''}
                                onChange={onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                            />

                            <div className="mb-3">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setDataProfile(prevState =>({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }}
                                    className="btn btn-light"
                                >
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-info btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
      )
    return (
        <div className="create-profile">
            {affichage}
        </div>
    );
}
