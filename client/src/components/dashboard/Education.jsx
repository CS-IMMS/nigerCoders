import React from 'react'
import Moment from 'react-moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import { reset,getProfile,deleteEducation } from '../../features/auth/profileSlice';
import { useSelector } from 'react-redux';

function Education() {
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

    const education = profile?.education?.map(edu => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={()=> dispatch(deleteEducation(edu._id))}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    return (
        <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    )
}

export default Education
