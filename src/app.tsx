import { useDispatch, useSelector } from "react-redux";
import "./reset.css";
import "./setRem.css";
import styled from "styled-components";
import { RootReducerType } from "reduxes";
import { useEffect, useRef } from "react";
import * as metaMask from "./modules/metamask";
import * as kaikas from "./modules/kaikas";
import { UserWalletMetaAction } from "./reduxes/userWalletMetaRedux";
import { UserWalletKaiAction } from "./reduxes/userWalletKaiRedux";
import RootRoute from "./routes";
import { useMediaQuery } from "react-responsive";
import { NowMediaQueryAction } from "./reduxes/nowMediaQueryRedux";

function App() {
    const { Metaaddress, Metaname } = useSelector(
        (state: RootReducerType) => state.UserWalletMetaReducer
    );
    const { Kaiaddress, Kainame } = useSelector(
        (state: RootReducerType) => state.UserWalletKaiReducer
    );
    const dispatch = useDispatch();
    const ethereum = useRef(window.ethereum);
    const klaytn = useRef(window.klaytn);

    //react-responsive
    const isPc = useMediaQuery({
        query: `(min-width: 768px)`,
    });

    const handleEtherium = () => {
        if (ethereum && ethereum.current.isMetaMask) {
            console.log("Metamask is alreay installed");
        } else {
            console.log("Please install MetaMask");
        }

        if (klaytn && klaytn.current.isKaikas) {
            console.log("Kaikas is already installed");
        } else {
            console.log("Please install Kaikas");
        }
    };

    useEffect(() => {
        dispatch(
            NowMediaQueryAction({
                isPc,
            })
        );
    }, [isPc, dispatch]);

    useEffect(() => {
        if (window.ethereum || window.klaytn) {
            handleEtherium();
            setInterval(async () => {
                let addressMeta = ethereum.current.selectedAddress;
                let addressKikas = klaytn.current.selectedAddress;

                if (!addressMeta) {
                    console.log("Please connect Metamask Wallet");
                } else {
                    let resultMeta = await metaMask.connectedWalletMeta(
                        addressMeta,
                        ethereum.current
                    );
                    if (!Metaaddress.includes(resultMeta?.address)) {
                        dispatch(
                            UserWalletMetaAction({
                                Metaaddress: resultMeta?.address,
                                Metaname,
                                Metabalance: resultMeta?.balance,
                                Metaconnect: true,
                            })
                        );
                    }
                }
                if (!addressKikas) {
                    console.log("Please connect Kaikas Wallet");
                } else {
                    let resultKai = await kaikas.connectedWalletKai(
                        addressKikas,
                        klaytn.current
                    );
                    if (!Kaiaddress.includes(resultKai?.address)) {
                        dispatch(
                            UserWalletKaiAction({
                                Kaiaddress: resultKai?.address,
                                Kainame,
                                Kaibalance: resultKai?.balance,
                                Kaiconnect: true,
                            })
                        );
                    }
                }
            }, 2000);
        } else if (!window.ethereum) {
            window.addEventListener("ethereum#initialized", handleEtherium, {
                once: true,
            });

            setTimeout(handleEtherium, 300);
        } else if (!window.klaytn) {
            window.addEventListener("klaytn#initialized", handleEtherium, {
                once: true,
            });

            setTimeout(handleEtherium, 300);
        }

        if (typeof window.ethereum !== "undefined") {
            window.ethereum.on("accountsChanged", async (accounts: any) => {
                let address;
                if (accounts.length > 0) {
                    address = accounts[0];
                    console.log(address);
                    let resultMeta = await metaMask.connectedWalletMeta(
                        address,
                        ethereum.current
                    );
                    dispatch(
                        UserWalletMetaAction({
                            Metaaddress: resultMeta?.address,
                            Metaname,
                            Metabalance: resultMeta?.balance,
                            Metaconnect: true,
                        })
                    );
                }
            });
        }
        if (typeof window.klaytn !== "undefined") {
            window.klaytn.on("accountsChanged", async (accounts: any) => {
                let address;
                if (accounts.length > 0) {
                    address = accounts[0];
                    console.log(address);
                    let resultKai = await kaikas.connectedWalletKai(
                        address,
                        klaytn.current
                    );
                    dispatch(
                        UserWalletKaiAction({
                            Kaiaddress: resultKai?.address,
                            Kainame,
                            Kaibalance: resultKai?.balance,
                            Kaiconnect: true,
                        })
                    );
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppStyle color="green">
            <RootRoute />
        </AppStyle>
    );
}

const AppStyle = styled.div`
    color: ${(props) => props.color};
`;

export default App;
