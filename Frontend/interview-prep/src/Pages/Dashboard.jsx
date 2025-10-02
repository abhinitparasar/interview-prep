
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import authService from '../features/auth/authService'; 
import { useNavigate } from 'react-router-dom';

// we fetch the userData like name etc. from the backend using the jwt token of the loggedIn user.
//we use the data to customize the dashboard for the particular user loggedIn
function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{// useeffect should not be async
    const fetchData = async()=>{
      try {
      const data = await authService.getUserData(user.token);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      navigate('/login');
    }
    }
    fetchData();
  }, [user, navigate]);
  
   if(isLoading){
        return <div className="text-3xl text-center font-semibold font-serif py-4 text-indigo-700">Loading...</div>;
    }

  return (
    <div className='container mx-auto py-12 text-center'>
      <h1>Welcome {userData?.name}</h1>
      <p>This is a private page only for logged-in users.</p>
    </div>
  )
}

export default Dashboard

//----------------------------------------------------------------------------
// due to strict mode we get two alert pop up on error we will fix that later on
