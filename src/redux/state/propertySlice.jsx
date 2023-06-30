import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    properties: [],
    loading: false,
    error: null,
    searchResults: [],
};

export const fetchProperties = createAsyncThunk( "properties/fetchProperties", async (currentPage, thunkAPI) => {
        const { rejectWithValue } = thunkAPI; // to catch error and return it
        try {
            const response = await fetch(`http://localhost:4000/property/?page=${currentPage}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
});

export const fetchProperty = createAsyncThunk( "properties/fetchProperty", async (propertyId, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await fetch(`http://localhost:4000/property/${propertyId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
});

export const searchProperties = createAsyncThunk( "properties/searchProperties", async (searchQuery, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(`http://localhost:4000/property/search/${searchQuery}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        },
});



export default propertiesSlice.reducer;