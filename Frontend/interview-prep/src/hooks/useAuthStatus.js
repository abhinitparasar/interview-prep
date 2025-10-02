import {useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

//React Hook Naming Rule
    //All custom hooks should start with "use" (React enforces this).
    //React may not recognize it as a hook, and you’ll get a linting/error warning like:
        // "React Hook 'userAuthStatus' is called in function ... but is neither a React function component nor a custom React Hook function"
function useAuthStatus() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [ checkingIn, setCheckingIn] = useState(true);// component accessing this hook will have checkingIn as true intially as useEffect run after the whole rendering is completed.Once the useeffect run it will set checkingIn as false for forever.

    const { user } = useSelector((state) => state.auth);

    useEffect(()=>{// useEffect runs after the rendering is completed coz react dont want any side effects during the render
        if(user){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
        setCheckingIn(false);
    },[user])

    return { loggedIn, checkingIn };
}

export default useAuthStatus;