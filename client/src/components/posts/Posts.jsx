import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getpost } from '../../features/post/postSlice'
import PostItem from './PostItem'
import { useLocation } from 'react-router'
import CommentForm from './CommentForm'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import CommentFeed from './CommentFeed'
function Posts() {
  const location = useLocation();

  let post_id = location.pathname.split('/')[2]
  //console.log(post_id);
  const dispath = useDispatch()

  const currPost = useSelector(
    (state) => state.posts
  )
  const { post, isLoading, isError, message } = currPost
  useEffect(() => {
    dispath(getpost(post_id))
  }, [])
  let postContent;
  if (post === null || isLoading || Object.keys(post).length === 0) {
    postContent = (<Spinner />);
  } else {
    postContent = (
      <div>
        <PostItem post={post} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post_id} />
      </div>
    );
  }
  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts
