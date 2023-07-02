import { configureStore } from '@reduxjs/toolkit'
import properties from "./state/propertySlice";
import cities from "./cities/citySlice"
const store = configureStore({
    reducer: { properties, cities },
});


export default store;