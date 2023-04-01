import React from 'react'
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../features/post/postSlice';

function CommentItem({post, comments}) {
 //console.log(post);
 const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth);
  let decodeUser = jwtDecode(user?.token)
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={comments.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{comments.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comments.text}</p>
          {comments.user === decodeUser.id && (
            <button
              onClick={() => {dispatch(deleteComment({postId : post, commentId: comments._id})) }}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
