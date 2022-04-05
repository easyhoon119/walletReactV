import { combineReducers } from "redux";
import ExampleReducer from "./exampleRedux";
import UserWalletMetaReducer from "./userWalletMetaRedux";
import UserWalletKaiReducer from "./userWalletKaiRedux";
import NowMediaQueryReducer from "./nowMediaQueryRedux";

const rootReducer = combineReducers({
    ExampleReducer,
    UserWalletMetaReducer,
    UserWalletKaiReducer,
    NowMediaQueryReducer,
});

export default rootReducer;
export type RootReducerType = ReturnType<typeof rootReducer>;
