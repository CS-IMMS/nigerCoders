import axios from "axios";
//import setAuthToken from "../../utils/setAuthToken";
//import { useSelector } from "react-redux";

const API_URL = 'http://localhost:4000/api/profile'
/* const { user } = useSelector((state) => state.auth)
const token = user.token */

const createProfile = async (profileData, token) => {
    const config = {
      headers: {
        'Authorization': `${token}`,
      },
    }
    const response = await axios.post(API_URL, profileData, config)
       //console.log(response.data);
    return response.data
}

const getProfile = async (token) => {
    const config = {
      headers: {
        'Authorization': `${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
    return response.data
}
//GET ALL Profiles
const getAllProfiles = async () => {

  const response = await axios.get(API_URL + '/all')
  //console.log(response.data);
  return response.data
}
// Edit profile
const editProfile = async (editData, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.post(API_URL, editData, config)
     //console.log(response.data);
  return response.data
}
//ADD EXPERIENCE
const addExperience = async (expData, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.post(API_URL + '/experience', expData, config)
     //console.log(response.data);
  return response.data
}

//ADD EDUCATION
const addEducation = async (eduData, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.post(API_URL + '/education', eduData, config)
     //console.log(response.data);
  return response.data
}
// DELETE EDUCATION
const deleteEducation = async (eduId, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.delete(API_URL + `/education/:${eduId}`, config)
     //console.log(response.data);
  return response.data
}

// DELETE EXPERIENCE
const deleteExperience = async (expId, token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.delete(API_URL + `/experience/:${expId}`, config)
     //console.log(response.data);
  return response.data
}

// Delete Account
const deleteAccount = async (token) => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  }
  const response = await axios.delete(API_URL + '/' , config)
     //console.log(response.data);
  return response.data
}
const profileService = {
    createProfile,
    getProfile,
    getAllProfiles,
    addEducation,
    addExperience,
    deleteEducation,
    deleteExperience,
    deleteAccount,
    editProfile
}
export default profileService