import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { deletePost,addLikes, unlikes } from '../../features/post/postSlice';
function PostItem({ post }) {
  const { user } = useSelector((state) => state.auth);
  let decodeUser = jwtDecode(user?.token)
  let dispatch = useDispatch()
  const allPost = useSelector(
    (state) => state.posts 
  )

  const onLikeClick = (id) => {
    // addLike(id);
  }

  const onUnlikeClick = (id) => {
    //removeLike(id);
  }


  let showActions = true
  //console.log(post);
  let delte = (
    <button
    onClick={()=> dispatch(deletePost(post._id))}
      type="button"
      className="btn btn-danger mr-1 mx-2"
    >
      <i className="fas fa-times" />
    </button>
  )
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showActions ? (
            <span>
              <button
                onClick={()=> dispatch(addLikes(post._id))}
                type="button"
                className="btn btn-light text-info mr-1"
              >
                <i
                  className='fas fa-thumbs-up text-info'
                />
                <span className="badge badge-info text-info">{post.likes.length}</span>
              </button>
              <button
                onClick={ () =>dispatch(unlikes(post._id))}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post?.user === decodeUser.id ? (
                delte
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default PostItem
