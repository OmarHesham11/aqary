import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCities = createAsyncThunk('cities/fetchCities', async (_, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:4000/city/getCities');
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error(error.message);
    }
});

const citySlice = createSlice({
    name: 'cities',
    initialState: {
        cities: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default citySlice.reducer;
