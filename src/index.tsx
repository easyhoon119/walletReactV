import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import RootReducer from "./store/reducers";
import RootRoute from "./routes";

const store = createStore(RootReducer);

ReactDom.render(
    <Provider store={store}>
        <React.StrictMode>
            <RootRoute />
        </React.StrictMode>
    </Provider>, document.querySelector('#root')
);