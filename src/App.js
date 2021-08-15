import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import UserList from "./components/UserList";
import { addNewTodo,fetchTodos } from "./store/todoSlice";
import { fetchUsers } from "./store/userSlice";


function App() {
  const [text, setText] = useState("");

  const {status,error}=useSelector(state=>state.todos)

  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addNewTodo(text));
    setText("");
  };

  useEffect(()=>{
    dispatch(fetchTodos())
    dispatch(fetchUsers())
  },[])

  

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />

      {status==='loading'&& <h2>Loading...</h2>}
      {error && <h2>an error occured :{error}</h2>}


      <TodoList />

      <UserList/>
    </div>
  );
}

export default App;
