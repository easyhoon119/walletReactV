import App from "./app";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reduxes";
import { CookiesProvider } from "react-cookie";

const store = createStore(rootReducer);

declare global {
    interface Window {
        ethereum: any;
        klaytn: any;
        caver: any;
    }
}

ReactDom.render(
    <Provider store={store}>
        <CookiesProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </CookiesProvider>
    </Provider>,
    document.querySelector("#root") as HTMLElement
);
