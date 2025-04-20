import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setGitHubIsAuthenticated } from '../RTK/features/authSlice';

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchToHome = async () => {
      try {
        const params = new URLSearchParams(location.search);
        // console.log("params" , params)
        const token = params.get('token');
        console.log("token => ",token)
        if (token) {
          dispatch(setGitHubIsAuthenticated(true));
          navigate('/home');	
        }
      } catch (error) {
        navigate("/login")
      }
    }
    fetchToHome()
  }, []);                                               
  return (
    <div>
      {/* Dashboard content */}
      
    </div>
  );
};

export default CallbackPage;