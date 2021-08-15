import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Server error");
      }
      
      const data=response.json()
        return data

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {


  },

  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "resolve";
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "rejected";

      state.error = action.payload;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
