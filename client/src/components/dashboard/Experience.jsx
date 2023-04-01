import React from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reset, getProfile, deleteExperience} from '../../features/auth/profileSlice';
import { useEffect } from 'react';
import Spinner from '../layout/Spinner';

function Experience() {
    const { user } = useSelector((state) => state.auth);
    const { profile, isLoading, isSuccess, isError, message} = useSelector(
        (state) => state.profile
    )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
        return () => {
            dispatch(reset())
        }
    }, [])

    //console.log(profile);
    const experiences = profile?.experience?.map(exp => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
            {exp.to === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={()=> dispatch(deleteExperience(exp._id))}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    return (
        <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experiences}
          </thead>
        </table>
      </div>
    )
}

export default Experience
