import React from 'react'
import CommentItem from './CommentItem'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from '../../features/post/postSlice';
function CommentFeed(post_id) {
    const dispath = useDispatch();
    useEffect(() =>{
        dispath(getAllPosts())
    },[dispath])
    const currPost = useSelector( state => state.posts );
    const { post } = currPost
    let lesComm = post.comments || []


    let postIds = post_id.postId
    return lesComm.map( comment => <CommentItem key={comment._id} comments={comment} post={postIds}/>)
}
 
export default CommentFeed
