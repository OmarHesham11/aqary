import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    properties: [],
    loading: false,
    error: null
};

export const fetchProperties = createAsyncThunk( "properties/fetchProperties", async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI; // to catch error and return it
        try {
            const response = await fetch("http://localhost:4000/property/");
            const data = await response.json();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers:{
         // fetch properties
        [fetchProperties.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchProperties.fulfilled]: (state, action) => {
            state.loading = false;
            state.properties = action.payload;
        },
        [fetchProperties.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});



export default propertiesSlice.reducer;