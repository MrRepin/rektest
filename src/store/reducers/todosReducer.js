import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../constants/api';

export const fetchTodos = createAsyncThunk(
    'todos/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API.TEST);

            return response.data;
        } catch (err) {
            console.warn(err);
        }
    }
)

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
    },
    reducers: {
        setTodos: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
