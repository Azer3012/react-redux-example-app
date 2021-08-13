import { createSlice } from "@reduxjs/toolkit";

const todoSlice=createSlice({

    //useselector ile cagiranda misalcun state-i  state.todos.todos cagirilacaq
    name:'todos',
    initialState:{
        todos:[]
    },
    //reducer icinde istifade edeceyim funksiyalar olacaq
    reducers:{
        addTodo(state,action){
            state.todos.push({
                id: new Date().toISOString(),
                text:action.payload,
                completed: false,
            })
        },
        removeTodo(state,action){
            state.todos=state.todos.filter(todo=>todo.id!==action.payload)
        },
        toogleTodoComplete(state,action){

            const toggleTodo=state.todos.find(todo=>todo.id===action.payload)

            toggleTodo.completed=!toggleTodo.completed
        }
    }
})

export const {addTodo,removeTodo,toogleTodoComplete}=todoSlice.actions

export default todoSlice.reducer