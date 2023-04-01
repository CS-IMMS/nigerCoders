import React from 'react'
import { useState } from 'react'
import TextAreaFieldGroup from '../common/TextFieldGroup'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addPost } from '../../features/post/postSlice'
import jwtDecode from 'jwt-decode'
function PostForm() {
    const [texts, setText] = useState({
        text: '',
        errors:{}
    })

    const dispath = useDispatch()
    const {text,errors} = texts
    const { user } = useSelector((state) => state.auth);
    let decodeUser = jwtDecode(user?.token)
    const onSubmit = (e) => {
        e.preventDefault();
    
        const newPost = {
          text: text,
          name: decodeUser.name,
          avatar: decodeUser.avatar
        };
        console.log(newPost);
        dispath(addPost(newPost))
        setText({text: ''})
        //this.props.addPost(newPost);
        //this.setState({ text: '' });
      }
    
     const onChange = (e) => {
        setText({ [e.target.name]: e.target.value });
      }
    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">Say Somthing...</div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup
                                placeholder="Create a post"
                                name="text"
                                value={text}
                                onChange={onChange}
                                //error={errors}
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

export default PostForm
