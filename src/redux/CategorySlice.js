import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../utils/axiosClient";

export const getCategoryDataThunk = createAsyncThunk(
  "/api/categories",
  async () => {
    try {
      const response = await axiosClient("catergories?populate=image");
      return response.data.data;
    } catch (error) {
        console.log(error)
    }
  }
);

const CategorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    data:[],
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(getCategoryDataThunk.fulfilled,(state,action)=>{
        state.data = action.payload;
    })
  }
});

export default CategorySlice.reducer;
