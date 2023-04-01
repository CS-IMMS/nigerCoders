import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { reset, getAllProfiles } from '../../features/auth/profileSlice'
import { useLocation } from 'react-router'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import UserGithub from './UserGithub'
import isEmpty from '../../utils/isEmpty'
import {v4 as uuidv4} from "uuid"
export default function UserProfile() {


    const dispath = useDispatch()
    useEffect(() => {
        dispath(getAllProfiles())
    }, [])

    const profilesData = useSelector(
        (state) => state.profiles || []
    )
    const location = useLocation();
    let profileId = location.pathname.split('/')[3]
    //console.log(location.pathname.split('/')[3]);
    const { profiles, isLoading, isSuccess, isError, message } = profilesData
    let affichagePro = ''
    if (!profiles) {
        affichagePro = <Spinner />
    } else {
        let currenProfile = profiles.filter(profile => profile._id === profileId)[0]
        //console.log(currenProfile.social);
        //console.log(currenProfile.education[0].from.split('T0')[0] )
        affichagePro = (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                                </div>
                                <div className="col-6">
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-body bg-info text-white mb-3">
                                        <div className="row">
                                            <div className="col-4 col-md-3 m-auto">
                                                <img className="rounded-circle" src={currenProfile?.user?.avatar} alt="" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h1 className="display-4 text-center">{currenProfile?.user?.name}</h1>
                                            <p className="lead text-center"> {currenProfile?.user?.handle}</p>
                                            <p>{currenProfile?.user?.location}</p>
                                            <p>
                                                {isEmpty(currenProfile.website) ? null : (
                                                    <a
                                                        className="text-white p-2"
                                                        href={currenProfile.website}
                                                        target="_blank"
                                                    >
                                                        <i className="fas fa-globe fa-2x" />
                                                    </a>
                                                )}
                                                {isEmpty(currenProfile.social && currenProfile.social.facebook) ? null : (
                                                    <a
                                                        className="text-white p-2"
                                                        href={currenProfile.social.facebook}
                                                        target="_blank"
                                                    >
                                                        <i className="fab fa-facebook fa-2x" />
                                                    </a>
                                                )}

                                                {isEmpty(currenProfile.social && currenProfile.social.linkedin) ? null : (
                                                    <a
                                                        className="text-white p-2"
                                                        href={currenProfile.social.linkedin}
                                                        target="_blank"
                                                    >
                                                        <i className="fab fa-linkedin fa-2x" />
                                                    </a>
                                                )}

                                                {isEmpty(currenProfile.social && currenProfile.social.youtube) ? null : (
                                                    <a
                                                        className="text-white p-2"
                                                        href={currenProfile.social.youtube}
                                                        target="_blank"
                                                    >
                                                        <i className="fab fa-youtube fa-2x" />
                                                    </a>
                                                )}

                                                {isEmpty(currenProfile.social && currenProfile.social.instagram) ? null : (
                                                    <a
                                                        className="text-white p-2"
                                                        href={currenProfile.social.instagram}
                                                        target="_blank"
                                                    >
                                                        <i className="fab fa-instagram fa-2x" />
                                                    </a>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-body bg-light mb-3">
                                        <h3 className="text-center text-info">{currenProfile?.handle} Bio</h3>
                                        <p className="lead">
                                            {currenProfile?.bio}
                                        </p>
                                        <hr />
                                        <h3 className="text-center text-info">Skill Set</h3>
                                        <div className="row">
                                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                                                {
                                                    currenProfile.skills.map(prof =>
                                                        <div className="p-3" key={uuidv4()}>
                                                            <i className="fa fa-check"></i> {prof} </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-6">
                                    <h3 className="text-center text-info">Experience</h3>
                                    <ul className="list-group">
                                        {

                                            currenProfile?.experience?.map(exp =>
                                                <li className="list-group-item" key={exp._id}>
                                                    <h4>{exp.company}</h4>
                                                    <p> {exp.to} </p>
                                                    <p>
                                                        <strong>Position:</strong> {exp.title}
                                                    </p>
                                                    <p>
                                                        <strong>Description:</strong> {exp.description} </p>
                                                </li>
                                            )

                                        }
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="text-center text-info">Education</h3>
                                    <ul className="list-group">
                                        {
                                            currenProfile?.education?.map(edu => {
                                                let date = edu.from.split('T0')[0]
                                                let date2 = edu.to.split('T0')[0]
                                                return (
                                                    <li className="list-group-item" key={edu._id}>
                                                        <h4> {edu.school} </h4>
                                                        <p>
                                                            From {date} to {date2}
                                                        </p>
                                                        <p>
                                                            <strong>Degree: </strong> {edu.school} </p>
                                                        <p>
                                                            <strong>Field Of Study: </strong> {edu.fieldofstudy} </p>
                                                        <p>
                                                            <strong>Description:</strong>  {edu.description} </p>
                                                    </li>
                                                )
                                            }
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                            {currenProfile?.githubusername ? (<UserGithub username={currenProfile?.githubusername} />) : null}

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //profilesData.map(profile => console.log( profile.id))

    return (<>
        {affichagePro}
    </>

    )
}
