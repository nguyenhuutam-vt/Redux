import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchBlog = createAsyncThunk(
  "blogs/fetchBlogs",
  async (blogId, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/blogs`);
    const data = await response.json();
    return data;
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blog: IBlog, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const data = await response.json();
    if (data && data.id) {
      // Handle successful blog creation
      thunkAPI.dispatch(fetchBlog());
    }
    return data;
  }
);

export const updateBlog = createAsyncThunk(
  "users/updateBlog",
  async (blog: IBlog, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: blog.title,
        author: blog.author,
        content: blog.content,
      }),
    });
    const data = await response.json();
    if (data && data.id) {
      // Handle successful user creation
      thunkAPI.dispatch(fetchBlog());
    }
    return data;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id: number, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle successful user creation
    thunkAPI.dispatch(fetchBlog());

    return id;
  }
);

export interface IBlog {
  id?: number;
  title: string;
  content: string;
  author: string;
}
const initialState = {//để dùng useAppSelector có thể lấy ra
  listBlog: [] as IBlog[],
  isCreateSuccess: false,
};

export const blogSlice = createSlice({
  name: "user",
  initialState,
  reducers: {//(đồng bộ)
    resetCreate: (state) => {
      state.isCreateSuccess = false;
    },
  }, 
  extraReducers: (builder) => { //(cho async hoặc action từ slice khác).
    //extra thuc hien 1 api
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
      state.listBlog = action.payload;
    });
    builder.addCase(createBlog.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
      state.isCreateSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate } = blogSlice.actions;

export default blogSlice.reducer;
