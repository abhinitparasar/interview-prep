import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interviewService from "./interviewService";
import { act } from "react";

const initialState = {
    interviews : [],
    currentInterview : {
        role:'',
        questions:[]
    },
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ''
}

// generateQuestionsWithResume thunk

export const generateQuestionsWithResume = createAsyncThunk('interview/generateQuestionsWithResume',async(formData, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await interviewService.generateQuestionsWithResume(formData, token);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// getInterviewById thunk

export const getInterviewById = createAsyncThunk('interviews/getOne', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await interviewService.getInterviewById(id, token);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//generate comprehensive report thunk
export const generateFeedbackReport = createAsyncThunk('interview/generateReport', async(data , thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await interviewService.generateFeedbackReport(data, token);
    } catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//generateQuestions thunk
export const generateQuestions = createAsyncThunk('interviews/questions', async(role, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await interviewService.generateQuestions(role, token);
    }catch (error) {
        const message = error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//getInterviews
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
            .addCase(generateQuestions.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(generateQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentInterview.questions = action.payload;
                state.currentInterview.role = action.meta.arg; //createasyncthunk actions have following property type, payload, meta. arg is the argument passed during dispatch.
            })
            .addCase(generateQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            })
            .addCase(generateFeedbackReport.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(generateFeedbackReport.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;

            })
            .addCase(generateFeedbackReport.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getInterviewById.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getInterviewById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentInterview = action.payload;
            })
            .addCase(getInterviewById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(generateQuestionsWithResume.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(generateQuestionsWithResume.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentInterview.questions = action.payload;
                state.currentInterview.role = "Resume Based Interview"
            })
            .addCase(generateQuestionsWithResume.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            
    }
})

export const {reset} = interviewSlice.actions;
export default interviewSlice.reducer;