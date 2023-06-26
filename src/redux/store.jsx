import { configureStore } from '@reduxjs/toolkit'
import properties from "./state/propertySlice";

const store = configureStore({
    reducer: { properties, },
});


export default store;