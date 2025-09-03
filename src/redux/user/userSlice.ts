import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (userId, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users`);
    const data = await response.json();
    console.log(data);

    return data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user: IUser, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data && data.id) {
      // Handle successful user creation
      thunkAPI.dispatch(fetchUser());
    }
    return data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: IUser, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
      }),
    });
    const data = await response.json();
    if (data && data.id) {
      // Handle successful user creation
      thunkAPI.dispatch(fetchUser());
    }
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle successful user creation
    thunkAPI.dispatch(fetchUser());

    return id;
  }
);

export interface IUser {
  id?: number;
  email: string;
  name: string;
}
const initialState = {
  listUser: [] as IUser[],
  isCreateSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreate: (state) => {
      state.isCreateSuccess = false;
    },
  }, //thuc hien 1 funtion
  extraReducers: (builder) => {
    //extra thuc hien 1 api
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
      state.listUser = action.payload;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
      state.isCreateSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate } = userSlice.actions;

export default userSlice.reducer;
