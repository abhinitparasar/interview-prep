import {Header, Register, Login, Home} from "./Components/index"
import{Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
     <Header/>
     {/* The <Routes> Component: The Switchboard Operator
Think of the <Routes> component as a container or a controller. Its one and only job is to look at the current browser URL and then search through all of its children (<Route> elements) to find the one that best matches that URL.

Once it finds the best match, it renders the component associated with that route and ignores all the others. If no routes match, it renders nothing (unless you've set up a "Not Found" route) 
-----------------------------------------------------------------------------------------------------------
A <Route> component is a rule that maps a URL path to a specific React component. It tells the parent <Routes> component: "If the URL looks like this, then you should display that."

It uses two important props:

path: This is the URL path you want to match. For example, path="/login" will match when the user goes to www.yourwebsite.com/login. The path "/" is special and matches the homepage or root URL.

element: This is the React component you want to render when the path matches. You pass it as JSX (e.g., element={<Login />}).
*/}
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
     </Routes>
     
    </>
    
  )
}

export default App
