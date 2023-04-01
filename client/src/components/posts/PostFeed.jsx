import React from 'react'
import PostItem from './PostItem'
function PostFeed({posts}) {
    
    return (
        <>
        {posts?.map(post => <PostItem key={post._id} post={post} />)}
        </>
    )
}

export default PostFeed
