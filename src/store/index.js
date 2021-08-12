import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './reducers/todosReducer';

export default configureStore({
    reducer: {
        todos: todosReducer,
    },
});