
import './App.css';
import Landing from './components/layout/Landing';
import { Route,Routes} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
//import store from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useSelector,useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { logout } from './features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoutes from './components/common/PrivateRoutes';
import CreateProfile from './components/create-profile/CreateProfile';
import Profiles from './components/pages/Profiles';
import { getAllProfiles } from './features/auth/profileSlice';
import UserProfile from './components/pages/UserProfile';
/* import Experience from './components/dashboard/Experience';
import Education from './components/dashboard/Education'; */
import AddEducation from './components/pages/AddEducation';
import AddExperience from './components/pages/AddExperience';
import EditProfile from './components/create-profile/EditProfile';
import Post from './components/posts/Post';
import Posts from './components/posts/Posts';
function App() {
  const dispatch = useDispatch()
  let decode = ''
  const currentTime = Date.now()/ 1000;
  //const user = localStorage.getItem('user')
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (user) {
    decode = jwt_decode(user.token)
    //console.log(decode.exp);
    if(decode.exp < currentTime) {
      dispatch(logout())
      // Todo : clear current Profile
      window.location.href = '/login'
    }
  }
  }, [user])
  //console.log(user);
  
  return (
    <>
      <Navbar/>
        <div>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/test' element={<Posts/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/profiles' element={<Profiles/>}/>
                <Route path='/user/profile/:id' element={<UserProfile/>}/>
                <Route element={<PrivateRoutes/>}>
                  <Route path='/dashbord' element={<Dashboard/>} /> 
                </Route>
                <Route element={<PrivateRoutes/>}>
                  <Route path='/create-profile' element={<CreateProfile/>} /> 
                </Route>
                <Route element={<PrivateRoutes/>}>
                  <Route path='/edit-profile' element={<EditProfile/>} /> 
                </Route>
                <Route element={<PrivateRoutes/>}>
                  <Route path='/add-experience' element={<AddExperience/>} /> 
                </Route>
                <Route element={<PrivateRoutes/>}>
                  <Route path='/add-education' element={<AddEducation/>} /> 
                </Route>
                <Route element={<PrivateRoutes/>}>
                  <Route path='/feed' element={<Post/>} /> 
                </Route>
                <Route element={<PrivateRoutes/>}>
                  <Route path='/post/:id' element={<Posts/>} /> 
                </Route>
            </Routes>
            <ToastContainer/>
        </div>
      <Footer/>
    </>
    
    

    
  );
}

export default App;
