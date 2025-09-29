import { configureStore } from "@reduxjs/toolkit"; // The core Redux Toolkit library.
import authReducer from "../features/auth/authSlice"


export const store = configureStore({
    reducer : {
        auth : authReducer,
    }
})


//---------------------State Management tool (redux)----------------------------
//The <Provider>'s primary job is to make the Redux store available to any nested component that needs it.

//useDispatch(): This hook doesn't create an action. It gives you access to the store's dispatch function. You then use that function to send (or "dispatch") an action that you've created. It's for WRITING to the store.

//Slice name (name in createSlice) → used only to build the action type string (sliceName/reducerName).

//useSelector(): Its only job is to READ data from the store. It subscribes your component to store updates.
//useSelector((state) => state.auth.user)==> in this "auth" name is from the store root reducer object.

//Store key (the key you put in configureStore.reducer) → decides where in state the slice’s state will live.(used by useSelector())

//Store itself is what "listens" for actions. When you dispatch an action, you're sending it directly to the store. The store then runs the reducers to update the state.After the state is updated, the store notifies react-redux, which then tells all the components that are subscribed via useSelector that they might need to re-render. The <Provider> is the component that makes this whole subscription mechanism possible.

//Reducer: A reducer is a pure JavaScript function that determines how the application's state changes. It takes the current state and an action object and returns the new state.

//--------------------The Flow ✅-------------------
// Here is the step-by-step flow with those refinements included:
// Event in Component: A user clicks a "Login" button in your React component.

// Get Dispatch Function: Your component has already called const dispatch = useDispatch(); to get access to the dispatch function.

// Dispatch the Action: The button's onClick handler calls dispatch(login(userData)). This creates a login action and sends it directly to the store.

// Store Receives Action: The store takes the action and passes it to its single root reducer.

// Root Reducer Directs Traffic: The root reducer sees the action's type (e.g., 'auth/login') and passes it along to the specific slice reducer that handles the auth state (authReducer).

// Slice Reducer Finds the Case: The authReducer checks the action's type and matches it to the correct case reducer (the login function inside your slice).

// Case Reducer Updates State: The login case reducer runs, updating its slice of the state with the payload from the action.

// Store Updates and Notifies: The store saves the new state returned by the reducer. It then notifies react-redux that a change has occurred.

// Component Re-renders: Any component using useSelector(state => state.auth.isLoggedIn) will see that the value it selected has changed, causing it to re-render with the new information.
//------------------------------------------------------------------------------------

// Redux internally builds a root reducer that looks like this:(store reducer)
// function rootReducer(state = {}, action) {
//   return {
//     auth: authReducer(state.auth, action),
//     products: productReducer(state.products, action),
//   };
// }
// So whenever you dispatch an action, Redux will:
// Run authReducer with the action
// Run productReducer with the action
// Combine their results into the new state
// when the store runs authReducer(state.auth, action), the reducer checks:
// If action.type matches one of its known cases ("auth/loginSuccess", "auth/logout", etc.), it updates the state accordingly.
// If not, it just returns the existing state unchanged.
//--------------------------------------------------------------------------------

// The reducer generated from createSlice is essentially like:

// function authReducer(state = { user: null }, action) {
//   switch (action.type) {
//     case "auth/loginSuccess":
//       return { ...state, user: action.payload };
//     case "auth/logout":
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// }

// Notice:
// It receives only its own slice of state (state.auth from root reducer).
// It checks action.type.
// If matches → update; otherwise return unchanged state.

// Root reducer = calls every slice reducer with its slice of state.

// Slice reducer = a function that knows how to handle only a few action types related to its slice.

//action is an object that have type and payload(optional) field