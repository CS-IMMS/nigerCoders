import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from 'jwt-decode'
const API_URL = 'http://localhost:4000/api/users/'


//Register user
const register = async (userData) =>{
    const response = await axios.post(API_URL + 'register', userData)

    if (response.data) {
        console.log(response.data);
        //localStorage.setItem('user',  JSON.stringify(response.data))
    }

    return response.data
}
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      
      /* const decode = jwt_decode(response.data.token)
        console.log(decode); */
      setAuthToken(true)
    }
    return response.data
  }
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('user')
    setAuthToken(false)
    window.location.href = '/'
  }
  
  const authService = {
    register,
    logout,
    login,
  }
export default authService