import { combineReducers } from "redux";
import ExampleReducer from "./exampleRedux";

const rootReducer = combineReducers({
    ExampleReducer
});

export default rootReducer;
export type RootReducerType = ReturnType<typeof rootReducer>;