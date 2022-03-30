import { combineReducers } from "redux";
import ExampleReducer from "./exampleRedux";
import UserWalletMetaReducer from "./userWalletMetaRedux";
import UserWalletKaiReducer from "./userWalletKaiRedux";

const rootReducer = combineReducers({
    ExampleReducer,
    UserWalletMetaReducer,
    UserWalletKaiReducer
});

export default rootReducer;
export type RootReducerType = ReturnType<typeof rootReducer>;