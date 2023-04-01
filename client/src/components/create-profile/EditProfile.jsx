import React from 'react'
import InputGroup from '../common/inputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { toast } from 'react-toastify'
import Spinner from '../layout/Spinner'
import isEmpty from '../../utils/isEmpty';
import { editProfile } from '../../features/auth/profileSlice';
function EditProfile() {
    const [EditProfile, setEditProfile] = useState({
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
    const { handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram } = EditProfile

    
    const { profile, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.profile
    )
    const navigate = useNavigate()
    const dispath = useDispatch()
    let affichage = ''
    useEffect(() => {
        if (profile) {
            
            const skillsCSV = profile.skills.join(',');
            let copy = {...profile}
            // If profile field doesnt exist, make empty string
            copy.company = !isEmpty(copy.company) ? copy.company : '';
            copy.website = !isEmpty(copy.website) ? copy.website : '';
            copy.location = !isEmpty(copy.location) ? copy.location : '';
            copy.githubusername = !isEmpty(copy.githubusername)
                ? copy.githubusername
                : '';
            copy.bio = !isEmpty(copy.bio) ? copy.bio : '';
            copy.social = !isEmpty(copy.social) ? copy.social : {};
            copy.twitter = !isEmpty(copy.social.twitter)
                ? copy.social.twitter
                : '';
            copy.facebook = !isEmpty(copy.social.facebook)
                ? copy.social.facebook
                : '';
            copy.linkedin = !isEmpty(copy.social.linkedin)
                ? copy.social.linkedin
                : '';
            copy.youtube = !isEmpty(copy.social.youtube)
                ? copy.social.youtube
                : '';
            copy.instagram = !isEmpty(copy.social.instagram)
                ? copy.social.instagram
                : '';
            setEditProfile({
                handle: copy.handle,
                company: copy.company,
                website: copy.website,
                location: copy.location,
                status: copy.status,
                skills: skillsCSV,
                githubusername: copy.githubusername,
                bio: copy.bio,
                twitter: copy.twitter,
                facebook: copy.facebook,
                linkedin: copy.linkedin,
                youtube: copy.youtube,
                instagram: copy.instagram,
            })
        }
        if (isError) {
            toast.error(message)
        }
        if (isLoading) {
            affichage = <Spinner />
        }

    }, [profile])
    const onChange = (e) => {
        setEditProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
        //console.log(e.target.name);
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const EditDataProfile = {
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
        console.log(EditDataProfile);
        dispath(editProfile(EditDataProfile))
        navigate('/dashbord')
        //props.createProfile(EditProfile, props.history);
    }
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

    const { displaySocialInputs } = editProfile;
    let errors = message
    let socialInputs;
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
    
    affichage = (
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Your Profile</h1>
                    <p className="lead text-center">
                        Let's update some information to make your profile stand out
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
                            {/* <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setEditProfile(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }))
                                }}
                                className="btn btn-light"
                            >
                                Add Social Network Links
                            </button> */}
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

export default EditProfile
