import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllProfiles, reset } from '../../features/auth/profileSlice'
import { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import {v4 as uuidv4} from "uuid"
export default function Profiles() {
  const dispath = useDispatch()

  useEffect(() => {
    dispath(getAllProfiles())
    
  }, [])

  const profilesData = useSelector(
    (state) => state.profiles || []
  )
  const { profiles, isLoading, isSuccess, isError, message } = profilesData
  //console.log(profiles[0]);
  let affichage = null
  let linkToProfile =  id=> {return `/user/profile/${id}`;}
  if (!profiles) {
    affichage = <Spinner />
  }else{
    affichage= (
      
        profiles.map(profile =>
          <>
            <div className="card card-body bg-light mb-3" key={uuidv4()}>
              <div className="row">
                <div className="col-2">
                  <img className="rounded-circle" src={profile.user.avatar} alt="" />
                </div><div className="col-lg-6 col-md-4 col-8">
                  <h3>{profile.name}</h3>
                  <p>{profile.bio}</p>
                  <p>{profile.location}</p>
                  <Link to={linkToProfile(profile._id)} className="btn btn-info">View Profile</Link>
                </div>
                <div className="col-md-4 d-none d-lg-block">
                  <h4>Skill Set</h4>
                  <ul className="list-group">
                    {
                      profile.skills.map(skill =>
                        <li className="list-group-item" key={uuidv4()}>
                          <i className="fa fa-check pr-1"></i>{skill}</li>
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>
          </>
        )
      
    )
  }
  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">Browse and connect with developers</p>
            {affichage }
          </div>
        </div>
      </div>
    </div>
  )
}
