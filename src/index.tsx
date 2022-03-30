import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reduxes";
import RootRoute from "./routes";

const store = createStore(rootReducer);

declare global {
    interface Window {
        ethereum : any;
        klaytn : any;
        caver : any;
    }
}

ReactDom.render(
    <Provider store={store}>
        <React.StrictMode>
            <RootRoute />
        </React.StrictMode>
    </Provider>, document.querySelector('#root') as HTMLElement
);