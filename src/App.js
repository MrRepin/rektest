import './App.css';
import { Button } from './components/ui/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, setTodos } from './store/reducers/todosReducer';
import { useEffect } from 'react';
import { DBOpen, getStoreByTransaction, multipleAdd } from './utils/indexedDB';
import { DB } from './constants/db';

let db = null;

function App() {
    const todos = useSelector((state) => state.todos.items);
    const dispatch = useDispatch();

    const fetchTodosList = () => {
        const store = getStoreByTransaction(db, DB.TEST.STORES.TODOS, 'readwrite');
        const getAll = store.getAll();

        getAll.onsuccess = async (ev) => {
            const result = ev.target.result;

            if (result.length === 0) {
                const data = await dispatch(fetchTodos()).unwrap();

                multipleAdd(data, db, DB.TEST.STORES.TODOS, 'readwrite');
            } else {
                dispatch(setTodos(result));
            }
        };
    };

    const initDB = async () => {
        db = await DBOpen(DB.TEST.NAME, DB.TEST.STORES.TODOS);
    };

    useEffect( () => {
        initDB();
    }, []);

    return (
        <div className="App">
            <Button onClick={fetchTodosList}>Отправить запрос</Button>
        </div>
    );
}

export default App;
