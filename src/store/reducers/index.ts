import { combineReducers } from "redux";
import ExampleReducer from "./exampleReducer";

const RootReducer = combineReducers({
    ExampleReducer
})

export default RootReducer;
export type rootReducerType = ReturnType<typeof RootReducer>;