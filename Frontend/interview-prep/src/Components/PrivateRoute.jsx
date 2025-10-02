import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus"

function PrivateRoute() {
    const { loggedIn, checkingIn } = useAuthStatus();
    
    if(checkingIn){
        return <div className="text-3xl text-center font-semibold font-serif py-4 text-indigo-700">Loading...</div>;
    }

  return loggedIn ? <Outlet/> : <Navigate to='/login'/> 
  //<Outlet />: This is a special component from react-router-dom. When you nest routes, the <Outlet /> in the parent route component acts as a placeholder where the child route's component will be rendered.
}

export default PrivateRoute

//---------------------------------------------------------------------------------------------------------------------
// The useNavigate() Hook
// What it is: useNavigate is a React Hook provided by React Router. When you call it, it gives you back a function (which we typically name Maps) that you can use to programmatically change the user's location.
// The keyword here is "programmatically". This means you use it inside your component's logic, usually in response to an event like a button click, a form submission, or after an API call has finished.(use inside js logic part not inside jsx)

// The <Navigate> Component
// What it is: <Navigate> is a React Component. Its only job is to render and immediately navigate to a new location. It's a declarative way to handle redirects.
// The keyword here is "declarative". You don't call a function; you simply render this component in your JSX. The moment React tries to render <Navigate>, the redirection happens.(use inside jsx)
