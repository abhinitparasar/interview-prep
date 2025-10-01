import { useEffect, useState } from "react"
import { register } from "../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice" 

function Register() {
    //useState Hook: This is the fundamental React Hook for adding state to a functional component. State is essentially any data that can change over time and should cause the component to re-render.

    //formData: This is our state variable. It can var, object, array etc.

    //setFormData: This is the updater function for our state. You never change formData directly (e.g., formData.name = 'new name'). You always use this function to update the state, which tells React to re-render the component with the new data.
    const[formData, setFormData] = useState({
        name : "",
        email : "",
        password : ""
    });

    const {name , email , password} = formData;

    const dispatch = useDispatch();//The useDispatch hook gives you access to your Redux store's dispatch function. This function is the only way to send (dispatch) an action to your store to trigger a state change.It comes from the react-redux lib.
    //Analogy:Think of your Redux store as a central mailroom for your application's state. The dispatch function is your official postal service. To make a change, you give a letter (an action) to the postal service (dispatch), which delivers it to the mailroom (store/reducers). The mailroom then updates its records (state) based on the letter's instructions.

    const navigate = useNavigate();//The useNavigate hook gives you a function (which we've named navigate) that you can call to redirect the user to a different page or route within your application.While you can use the <Link> component for standard navigation where a user clicks a link, navigate is essential for situations where you need to redirect based on code logic. A classic example is redirecting a user to their dashboard after a successful login.It comes from react-router-dom lib.

    const {user, isLoading, isSuccess, message, isError} = useSelector((state) => state.auth);//you use it to "select" a piece of the state that your component needs to display or use in its logic.
    //The useSelector hook takes a single argument: a selector function.
    // Selector Function: This function receives the entire Redux state object as its argument.
    // Return Value: Your job is to write this function so that it returns the specific slice of state you are interested in.

     useEffect(()=>{
                if(isError){
                    alert(`Error : ${message}`)
                }

                if(isSuccess || user){
                    navigate('/');
                }
                dispatch(reset());
            },[user, isError, isSuccess, message, navigate, dispatch]);//navigate, dispatch is stable in between re-render
            //useEffect run on every re-render if there is no dependency array, run once if the array is empty when the component gets mount or run if the value inside array changes from the last render.

//1. What does “render” mean in React?
// “Render” means React is calling your component function (MyComponent()) to figure out what the UI should look like.
// The return value (JSX → React elements) describes the UI tree.
// React then compares it with the previous render (diffing) and updates the DOM if needed.
// So a render doesn’t always mean the DOM changes — it just means React calculated the UI again.

// When does React re-render a component?
// A re-render happens when:
// Props change → If a parent passes new props.
// State changes → If you call setState() (or Redux updates and useSelector sees a different value).
// Context value changes → If the context your component consumes updates.
// Force updates (rare, like forceUpdate() or Strict Mode double renders in dev).

    //----------------------------------------------------------------------------------------------

    //setCount(count + 1) Uses the stale count variable from the current render (closure).
    //If React batches multiple updates, they may all use the same old value → updates can be lost.

    //setCount(prev => prev + 1)(functional update) prev is always the latest state value provided by React.
    //Safe with batching → updates are applied one after another correctly.

    //Batching = React groups multiple state updates together to improve performance and reduce unnecessary re-renders.

    /*----------------------------------------------------------------------------------------------------*/

    //Event Trigger: The browser fires an onChange event. React passes an event object, which we call e, to our function.
    //The Event Object e: This object contains information about the event that just happened. We care about e.target, which is the HTML element that triggered the event (in this case, the <input> field for the name).
    const onChange = (e) => {
        setFormData((prevState) => ({
            //...prevState: This is the JavaScript spread syntax. It creates a copy of the entire previous state object. If our state was { name: '', email: '', password: '' }, this copies all three key-value pairs. This is critical because it ensures we don't lose the data from the other input fields.
            ...prevState,
            //e.target.name: This gets the name attribute from the HTML input tag. For the name field, it's "name". For the email field, it would be "email".
            //e.target.value: This gets the current text inside the input box. If you just typed "J", its value is "J".
            [e.target.name] : e.target.value,
            //[e.target.name]: e.target.value: This is a computed property name. 
            //without [] , key is taken as literal text
            //with [], key is evaluated as an expression.(when u want the key itself to be dynamic(based on a variable's value))
        }))
    }
    //-------------------------------------------------------------------------------------------------------
    //e.preventDefault():  By default, when you submit an HTML form, the browser reloads the page. In a modern React application (a Single Page Application), you want to handle the submission with JavaScript without a disruptive page refresh. This line stops the default browser behavior.

    //method: 'POST': This specifies the HTTP method. POST is used for creating new resources

    //headers: { 'Content-Type': 'application/json' }: This is like a label on a package. It tells the server, "The data I'm sending you in the body is in JSON format."

    //body: JSON.stringify(formData): The body contains the actual data being sent. Since HTTP can only send text, we must convert our JavaScript formData object into a JSON string using JSON.stringify().

    const onSubmit = async (e) =>{
        e.preventDefault();

//      try{
            //response { ... }
            //This is the response object returned by fetch(). It holds metadata about the HTTP response (status, headers, etc.) and gives you methods to read the body (.json(), .text(), etc.).
// response(object)
// ├─ type: "cors"               // Type of response (basic, cors, opaque)
// ├─ url: "http://localhost:3000/api/users/register"
// ├─ redirected: false           // True if the request was redirected
// ├─ status: 400                 // HTTP status code
// ├─ ok: false                    // True if status is 200–299
// ├─ statusText: "Bad Request"   // Human-readable status
// ├─ headers: Headers {}          // Headers object
// │    └─ (use get method to access headers)
// ├─ body: ReadableStream         // The response body stream
// ├─ bodyUsed: true               // True if body has been read already
// └─ [[Prototype]]: Response      // Inherited prototype methods like .json(), .text(), .clone()

    //         const response = await fetch("http://localhost:3000/api/users/register", {
    //             method:'POST',
    //             headers : {
    //                 'Content-Type':'application/json'
    //             },
    //             body : JSON.stringify(formData)
    //         });
    //         const data =  await response.json();//The initial response from fetch doesn't directly contain the data. This line takes the raw response and parses its JSON body into a usable JavaScript object.
    //         if(!response.ok) throw new Error(data.message || "Could not register user");
    //         //if (!response.ok): The response.ok property is a simple boolean that is true if the HTTP status code was successful (e.g., 200-299). If the status code indicates an error (like 400 for bad data or 500 for a server error), this if condition becomes true.

    //         //new Error() is a built-in JavaScript constructor used to create a standard error object.
    //         //When you create an error, it's not just a simple string; it's an object with useful properties for debugging.const myError = new Error('User not found');
    //         //myError contains field message, name, stack
    //         //--------------------------------------------------------------------------------------------
    //         console.log("registration successfull:", data);
    //         alert("registration successfull");

    //     }catch(err){
    //         console.error(err.message);
    //         alert("error :"+ err.message);
    //     }

            const userData = {name, email, password};
            dispatch(register(userData));

    } 

     if(isLoading){
        return <div className="text-3xl text-center font-semibold font-serif py-4 text-indigo-700">Loading...</div>;
    }

  return (
    <div className="container md:max-w-sm max-w-xs fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  p-6 rounded-2xl border-1 border-gray-300 hover:shadow-indigo-600 shadow-xl">
        <h1 className="text-2xl font-bold text-center font-serif  bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600">Create an Account</h1>
        <form onSubmit={onSubmit} className="mt-4 ">
            <div>
                <label 
                htmlFor="name" 
                className="block font-semibold font-serif ">
                Name
                </label>
                <input 
                className="w-full border font-serif rounded-lg p-1 px-2" 
                type="text" 
                id="name" 
                name="name" 
                value={name} 
                onChange={onChange} 
                required/>
            </div>
            <div>
                <label 
                htmlFor="email"
                className="block mt-2 font-semibold font-serif"
                >Email</label>
                <input 
                className="w-full border rounded-lg p-1 px-2" type="text"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                />
            </div>
            <div>
                <label
                htmlFor="password"
                className="block font-serif mt-2 font-semibold"
                >Password</label>
                <input 
                className="w-full border rounded-lg p-1 px-2" type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                />
            </div>
            <button 
            className="mt-4 w-full bg-indigo-700 p-2 font-bold text-white rounded-lg ">
            Register
            </button>

        </form>
      
    </div>
  )
}

export default Register
