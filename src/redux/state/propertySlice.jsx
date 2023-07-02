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
    console.log(formData.get('image'));
    console.log(typeof formData);
    try {
        axios({
            method: "post",
            url: "http://localhost:4000/auth/property/",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(function (res) {
            const data = res.data;
            return data;
        }).catch(function (response) {
            console.log(response);
        });
        // axios.post(`http://localhost:4000/auth/property/`, formData)
        // .then(({data}) => {
        //     return data;
        // }).catch(function (response) {
        //     console.log(response);
        // });
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
}
);

export const fetchProperties = createAsyncThunk("properties/fetchProperties", async (currentPage, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(`https://aqary-eg.onrender.com/property/?page=${currentPage}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

export const fetchProperty = createAsyncThunk("properties/fetchProperty", async (propertyId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(`https://aqary-eg.onrender.com/property/${propertyId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

export const searchProperties = createAsyncThunk("properties/searchProperties", async (searchQuery, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(`https://aqary-eg.onrender.com/property/search/${searchQuery}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

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
            })
            .addCase(createProperty.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProperty.fulfilled, (state, action) => {
                state.loading = false;
                state.properties.push(action.payload);
            })
            .addCase(createProperty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default propertiesSlice.reducer;
