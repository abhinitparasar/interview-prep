
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import authService from '../features/auth/authService'; 
import { useNavigate } from 'react-router-dom';
import {getInterviews, reset} from '../features/interview/interviewSlice'

// we fetch the userData like name etc. from the backend using the jwt token of the loggedIn user.
//we use the data to customize the dashboard for the particular user loggedIn
function Dashboard() {
  // const [userData, setUserData] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  // const navigate = useNavigate();

  // useEffect(()=>{// useeffect should not be async
  //   const fetchData = async()=>{
  //     try {
  //     const data = await authService.getUserData(user.token);
  //     setUserData(data);
  //     setLoading(false);
  //   } catch (error) {
  //     alert(error.message);
  //     navigate('/login');
  //   }
  //   }
  //   fetchData();
  // }, [user, navigate]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {interviews, isLoading, isError, message} = useSelector((state)=>state.interview);

  useEffect(()=>{
    if(isError){
      console.log(message);
    }
    dispatch(getInterviews());

    return ()=>{
      dispatch(reset());
    }
  },[dispatch])
  
   if(isLoading){
        return <div className="text-3xl text-center font-semibold font-serif py-4 text-indigo-700">Loading...</div>;
    }

  return (
    <div className='container mx-auto py-12 text-center'>
        <section className='text-center mb-12'>
          <h1 className='text-4xl font-bold'>Welcome, {user && user.name}</h1>
          <p className='mt-2 text-lg text-gray-600'>Your Interview dashboard</p>
        </section>

        <section>
          <h1 className='text-2xl font-semibold mb-4'>Your past Interviews</h1>
          {interviews.length > 0 ? 
          <div className='space-y-4'>
            {interviews.map((interview)=>(//map() is an array method that creates a new array by transforming each element.map() returns a new array of JSX elements, which React can render.
            //forEach() → returns undefined, so React has nothing to render.
            //React requires a unique key prop when rendering lists.It is required for React to efficiently update the DOM.
              <div key={interview._id} className='bg-white p-4 rounded-lg shadow'>
                <p>Role:{interview.role}</p>
                <p>Date:{new Date(interview.createdAt).toLocaleDateString()}</p>
                {/* createdAt is an ISO 8601 string, representing a date and time in UTC.
                #new Date(string) converts a string (or timestamp) into a JavaScript Date object.
                #.toLocaleDateString() converts the Date object to a human-readable string in the local timezone.It automatically formats the date according to the user’s locale settings (language and region). */}
              </div>
            ))}
          </div>:<p>No past interview</p>}
        </section>
    </div>
  )
}

export default Dashboard

//----------------------------------------------------------------------------
// due to strict mode we get two alert pop up on error we will fix that later on
