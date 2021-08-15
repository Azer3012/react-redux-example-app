import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//fetch etmek ucun createAsyncThunk istifade olunur

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",

  //rejectWithValue errorlari gostermek ucun istifade olunur
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",

  //burdaki dispatch ile reducersdeki funksiyalari isletmek ucun istifade edilir
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        }
      );
      if (!response.ok) {
        throw new Error("Can not add todo server error");
      }

      const data = await response.json();

      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Can not delete todo server error");
      }

      dispatch(removeTodo(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Can not toggle status server error");
      }

      dispatch(toogleTodoComplete(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const todoSlice = createSlice({
  //useselector ile cagiranda misalcun state-i  state.todos.todos cagirilacaq
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
    
  },
  //reducer icinde istifade edeceyim funksiyalar olacaq
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toogleTodoComplete(state, action) {
      const toggleTodo = state.todos.find((todo) => todo.id === action.payload);

      toggleTodo.completed = !toggleTodo.completed;
    },
  },

  //createAsyncThunk ile yazdigimiz funksiyalarin gedisatini gosterir
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolve";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = "rejected";

      state.error = action.payload;
    },
    [deleteTodo.rejected]: (state, action) => {
      state.status = "rejected";

      state.error = action.payload;
    },
    [toggleStatus.rejected]: (state, action) => {
      state.status = "rejected";

      state.error = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toogleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
