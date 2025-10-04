import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interviewService from "./interviewService";

const initialState = {
    interviews : [],
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ''
}

export const getInterviews = createAsyncThunk('interviews/getAll', async (_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;//thunkAPI.getState() → gets the current Redux store state.
        return await interviewService.getInterviews(token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const saveInterviews = createAsyncThunk('interviews/create', async(interviewData, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await interviewService.saveInterviews(interviewData, token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const interviewSlice = createSlice({
    name:'interview',
    initialState,
    reducers:{
        reset: (state) => {
            state.interviews=[];
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getInterviews.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getInterviews.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.interviews = action.payload; 
            })
            .addCase(getInterviews.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveInterviews.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(saveInterviews.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.interviews.push(action.payload);
            })
            .addCase(saveInterviews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = interviewSlice.actions;
export default interviewSlice.reducer;