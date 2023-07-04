import { configureStore } from '@reduxjs/toolkit'
import properties from "./state/propertySlice";
import cities from "./cities/citySlice";
import categories from "./state/categorySlice";

const store = configureStore({
    reducer: { properties, cities, categories },
});


export default store;