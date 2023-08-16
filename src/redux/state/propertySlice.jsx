import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    properties: [],
    loading: false,
    error: null,
    searchResults: [],
};

export const createProperty = createAsyncThunk("properties/CreateProperty", async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const url = 'https://aqary-eg.onrender.com/auth/property/';
        // const url = 'http://localhost:4000/auth/property/';
        const response = await axios({
            method: "post",
            url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        } else {

            return rejectWithValue(response.statusText);
        }
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});

export const fetchProperties = createAsyncThunk("properties/fetchProperties", async (currentPage, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(`https://aqary-eg.onrender.com/property/?page=${currentPage}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchProperty = createAsyncThunk("properties/fetchProperty", async (propertyId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(`https://aqary-eg.onrender.com/property/${propertyId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const searchProperties = createAsyncThunk("properties/searchProperties", async (searchQuery, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(`https://aqary-eg.onrender.com/property/search/${searchQuery}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchUserProperties = createAsyncThunk("properties/userProperties", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(`https://aqary-eg.onrender.com/auth/property/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const filterPropertiesByPrice = createAsyncThunk("properties/filterPropertiesByPrice", async (priceRange, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { page } = getState().properties.page;
    console.log(getState().properties);
    try {
        const response = await fetch(`http://aqary-eg.onrender.com/property/filter/properties/${priceRange.min}/?page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    };
});


const propertiesSlice = createSlice({
    name: "properties",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
            .addCase(fetchUserProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchUserProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(searchProperties.pending, (state) => {
                state.error = null;
            })
            .addCase(searchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProperty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProperty.fulfilled, (state, action) => {
                state.loading = false;
                state.properties.push(action.payload);
            })
            .addCase(createProperty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(filterPropertiesByPrice.fulfilled, (state, action) => {
                state.properties = action.payload;
            });
    },
});



export default propertiesSlice.reducer;