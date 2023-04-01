import React from 'react'
import Spinner from '../layout/Spinner'
import PostForm from './PostForm'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllPosts } from '../../features/post/postSlice'
import PostFeed from './PostFeed'
import { toast } from 'react-toastify'
function Post() {
    const { user } = useSelector((state) => state.auth);
    const dispath = useDispatch()
    const allPost = useSelector(
        (state) => state.posts 
      )
    const  {posts, isLoading, isError, message}   = allPost           
           
   useEffect(() => {
    dispath(getAllPosts())
    if(isError){
        toast.error(message)
    }
    
    
   }, [ ])

    //console.log(posts);

    let postContent;

    if (posts === null || isLoading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts}/>;
    }

    

  
    /* if (posts.length > 0){
        console.log(posts?.map(post => post.text));
    } */
    
    return (
        <div className="feed">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PostForm />
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
