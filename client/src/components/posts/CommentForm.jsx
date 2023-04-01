import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { useEffect } from 'react'
import { addComment, getpost } from '../../features/post/postSlice'
function CommentForm(post_id) {
  const [comText, setComText] = useState({
    text: '',
    error: {}
  })
  let id_post = post_id.postId
  const { text, error } = comText

  const { user } = useSelector((state) => state.auth);
  let decodeUser = jwtDecode(user?.token)
  const dispath = useDispatch()
  /*     
      
      
      
        useEffect(() => {
        dispath(getpost())
      }, [])
      const allPost = useSelector(
          (state) => state.post 
        )
      const  {post, isLoading, isError, message}   = allPost    */


  const onSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      text: text,
      name: decodeUser.name,
      avatar: decodeUser.avatar
    };
    console.log(newComment);

    dispath(addComment({ postId: id_post, commentData: newComment }))
    //addComment(postId, newComment);
    //setState({ text: '' });
  }

  const onChange = (e) => {
    setComText({ [e.target.name]: e.target.value });
  }
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          Make a comment...
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to post"
                name="text"
                value={text}
                onChange={onChange}
              //error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CommentForm
