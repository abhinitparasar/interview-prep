import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user :  user || null,
    token : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : "",
}

export const register = createAsyncThunk("auth/register", 
    async(user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    })

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {
        reset : (state) => {
            state.isError = false,
            state.isSuccess = false,
            state.isLoading = false,
            state.message = ""
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.user = null;
            state.message = action.payload
        })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;

// For each reducer you define (loginSuccess, logout), Redux Toolkit auto-generates action creators.

//So internally, it creates something like:
// function loginSuccess(payload) {
//   return {
//     type: "auth/loginSuccess",
//     payload,
//   };
// }

// function logout() {
//   return {
//     type: "auth/logout",
//   };
// }

// Redux Toolkit attaches these auto-generated action creators to the slice object under .actions.
// authSlice.actions is an object that looks like:
// {
//   loginSuccess: function(payload) { return { type: "auth/loginSuccess", payload }},
//   logout: function() { return { type: "auth/logout" }}
// }



//----------------------------------------createAsyncThunk() function------------------------------------------ 
// The beauty of createAsyncThunk is that it automatically handles the different stages of that operation: pending (it's started), fulfilled (it succeeded), and rejected (it failed).

//createAsyncThunk returns a “thunk action creator”, which is a function.
// You can call it with an argument (the payload for your async function) to get a thunk function.
// That thunk function can then be dispatched by Redux.

// export const register = createAsyncThunk(
//   /* Argument 1 */ 'auth/register',
//   /* Argument 2 */ async (user, thunkAPI) => {
//     try {
//       // The "happy path" - attempt the async operation
//       return await authService.register(user);
//     } catch (error) {
//       // The "error path" - what to do if it fails
//       const message = error.message || error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// Argument 1: The Action Type String
// The first argument is a string that acts as a prefix for the action types that will be automatically generated.

// 'auth/register'

// Based on this prefix, createAsyncThunk generates three action types for you to listen for in your slice:

// 'auth/register/pending': Dispatched right when you call the thunk. This is perfect for setting a loading state (e.g., isLoading = true).

// 'auth/register/fulfilled': Dispatched when your async function successfully returns a value. The returned value becomes the action.payload.

// 'auth/register/rejected': Dispatched when the async function fails. The value from rejectWithValue becomes the action.payload.

// You don't have to manually create these action types; createAsyncThunk does it for you, which saves a lot of boilerplate code.

// Argument 2: The "Payload Creator" Function
// This is an async function where you put your actual asynchronous logic. It's responsible for making the API call and returning the result or handling the error.

// async (user, thunkAPI) => { ... }

// Let's look at its two parameters:

// user: This is the argument you pass when you dispatch the thunk from your component. For example, when you call dispatch(register(userData)), the userData object becomes the user parameter here.

// thunkAPI: This is a special object provided by Redux Toolkit that contains useful tools. We are using one of its most important methods here: rejectWithValue.

// try {
//   return await authService.register(user);
// }
// await authService.register(user): This line calls your actual API function (defined in authService.js) and waits for it to complete.

// return ...: If the API call is successful and returns some data (like the user object with a token), this return statement passes that data along.

// Result: createAsyncThunk will then automatically dispatch the fulfilled action (auth/register/fulfilled), and the data you returned becomes the action.payload in your reducer.

// The catch Block (The "Error Path" ⛈️):

// catch (error) {
//   const message = error.message || error.toString();
//   return thunkAPI.rejectWithValue(message);
// }
// catch (error): If authService.register(user) throws an error (e.g., the user already exists, server is down), the code inside the catch block will run.

// return thunkAPI.rejectWithValue(message): This is the crucial part for error handling. Instead of just throwing the error, we call rejectWithValue.
// Result: This tells createAsyncThunk to officially "reject" the operation. It will then automatically dispatch the rejected action (auth/register/rejected), and the message we passed to rejectWithValue becomes the action.payload.

// Summary of the Flow
// In your component, you call dispatch(register({ name, email, password })).
// Redux Toolkit immediately dispatches the register.pending action (auth/register/pending). Your reducer can see this and set state.isLoading = true.
// The payload creator function runs and calls your API service authService.register(...).
// Scenario A (Success): The API call succeeds and returns user data. Your thunk returns this data. Redux Toolkit dispatches register.fulfilled with the user data as the payload. Your reducer can then set state.isLoading = false, state.isSuccess = true, and save the user data to state.user.
// Scenario B (Failure): The API call fails. The catch block runs. thunkAPI.rejectWithValue(errorMessage) is called. Redux Toolkit dispatches register.rejected with the error message as the payload. Your reducer can then set state.isLoading = false, state.isError = true, and save the error message to state.message.


//------------------------------------------extraReducers------------------------------------------
// reducers → you define normal synchronous reducers for your slice.This is for handling actions that are internal to the slice. For example, a simple reset action that you define right there in the slice.
// extraReducers → you define reducers for actions generated outside this slice, like createAsyncThunk.

// The builder Object
// The builder is a helper object provided by Redux Toolkit to let you define your case reducers in a clean and type-safe way.

// The addCase Method
// This is the core of the logic. The addCase method takes two arguments:
// An Action Creator: The specific action you want to handle (e.g., register.pending).
// A Reducer Function: The function that describes how to update the state when that action occurs (e.g., (state) => { state.isLoading = true; }).

// register.pending is an action creator generated by Redux Toolkit.
// You don’t call it manually.
// It’s automatically dispatched when the thunk starts.
// addCase(register.pending) listens for that action to update the state.