import axios from "axios";

const API_URL = 'http://localhost:4000/api/posts'
// Add post
const addPost = async (postData, token) => {
    const config = {
      headers: {
        'Authorization': `${token}`,
      },
    }
    const response = await axios.post(API_URL, postData, config)
       //console.log(response.data);
    return response.data
}

//Get Posts
const getAllPosts = async () => {
    const response = await axios.get(API_URL + '/')
       //console.log(response.data);
    return response.data
} 
//GET SINGLE POST
const getpost = async (postId,token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.get(API_URL + `/${postId}`, config)
     //console.log(response.data);
  return response.data
} 
// DELETE POST
const deletePost = async (delData, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.delete(API_URL + `/${delData}`, config)
     //console.log(response.data);
  return response.data
}
// ADD LIKES
const addLikes = async (postId, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.post(API_URL + `/like/${postId}`, postId,config)
     //console.log(response.data);
  return response.data
}
// ADD UNLIKES
const unLikes = async (postId, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.post(API_URL + `/unlike/${postId}`, postId,config)
     //console.log(response.data);
  return response.data
}
// ADD comment
const addComment = async (postId,commentData, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.post(API_URL + `/comment/${postId}`,commentData,config)
     //console.log(response.data);
  return response.data
}
// Delete comment
const deleteComment = async (postId,commentId, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  
  const response = await axios.delete(API_URL + `/comment/${postId}/${commentId}`, config)
  console.log(response.data);
  return response.data
}
const postServise = {
    addPost,
    getAllPosts,
    deletePost,
    addLikes,
    unLikes,
    getpost,
    addComment,
    deleteComment
}
export default postServise