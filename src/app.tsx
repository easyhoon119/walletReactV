import { useDispatch, useSelector } from 'react-redux';
import './reset.css';
import './setRem.css'
import styled from 'styled-components';
import { RootReducerType } from 'reduxes';
import { useEffect } from 'react';
import * as metaMask from "./modules/metamask";
import * as kaikas from "./modules/kaikas"
import { UserWalletMetaAction } from './reduxes/userWalletMetaRedux';
import { UserWalletKaiAction } from './reduxes/userWalletKaiRedux';
import RootRoute from './routes';
import { useMediaQuery } from 'react-responsive';
import { NowMediaQueryAction } from './reduxes/nowMediaQueryRedux';

function App() {

    const { Metaaddress, Metaname} = useSelector((state : RootReducerType) => state.UserWalletMetaReducer);
    const { Kaiaddress, Kainame } = useSelector((state : RootReducerType) => state.UserWalletKaiReducer);
    const dispatch = useDispatch();
    let ethereum : any;
    let klaytn : any;

    const isPc = useMediaQuery({
        query : `(min-width: 768px)`
    });

    useEffect(()=>{
        dispatch(NowMediaQueryAction({
            isPc
        }))
    },[isPc])

    useEffect(()=>{
        if(window.ethereum || window.klaytn) {
            handleEtherium();

            setInterval(async ()=>{
                let addressMeta = ethereum.selectedAddress;
                let addressKikas = klaytn.selectedAddress;
                
                if(!addressMeta) {
                    console.log('Please connect Metamask Wallet');
                }
                else {
                    let resultMeta = await metaMask.connectedWalletMeta(addressMeta, ethereum);
                    if(!Metaaddress.includes(resultMeta?.address)) {
                        dispatch(UserWalletMetaAction({
                            Metaaddress : resultMeta?.address,
                            Metaname,
                            Metabalance : resultMeta?.balance,
                            Metaconnect : true
                        }))
                    }  
                }
                if(!addressKikas) {
                    console.log('Please connect Kaikas Wallet');
                }
                else {
                    let resultKai = await kaikas.connectedWalletKai(addressKikas, klaytn);
                    if(!Kaiaddress.includes(resultKai?.address)) {
                        dispatch(UserWalletKaiAction({
                            Kaiaddress : resultKai?.address,
                            Kainame,
                            Kaibalance :  resultKai?.balance,
                            Kaiconnect : true
                        }))
                    }
                }
            },2000)
        }
        else if(!window.ethereum) {
            window.addEventListener('ethereum#initialized', handleEtherium, {once : true});

            setTimeout(handleEtherium, 300);
        }
        else if(!window.klaytn) {
            window.addEventListener('klaytn#initialized', handleEtherium, {once : true});

            setTimeout(handleEtherium, 300);
        }

        if(typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', async (accounts : any)=>{
                let address;
                if(accounts.length > 0) {
                    address = accounts[0];
                    console.log(address);
                    let resultMeta = await metaMask.connectedWalletMeta(address, ethereum);
                    dispatch(UserWalletMetaAction({
                        Metaaddress : resultMeta?.address,
                        Metaname,
                        Metabalance : resultMeta?.balance,
                        Metaconnect : true
                    }))
                }
            })
        }
        if(typeof window.klaytn !== 'undefined') {
            window.klaytn.on('accountsChanged', async (accounts : any) => {
                let address;
                if(accounts.length > 0) {
                    address = accounts[0]
                    console.log(address);
                    let resultKai = await kaikas.connectedWalletKai(address, klaytn);
                    dispatch(UserWalletKaiAction({
                        Kaiaddress : resultKai?.address,
                        Kainame,
                        Kaibalance : resultKai?.balance,
                        Kaiconnect : true
                    }))
                }
            })
        }
    },[]);

    const handleEtherium = () => {
        ethereum = window.ethereum;
        klaytn = window.klaytn;

        if(ethereum && ethereum.isMetaMask) {
            console.log('Metamask is alreay installed');
        }
        else {
            console.log('Please install MetaMask');
        }

        if(klaytn && klaytn.isKaikas) {
            console.log('Kaikas is already installed');
        }
        else {
            console.log('Please install Kaikas');
        }
    }

    return (
        <AppStyle color='green'>
            <RootRoute />
        </AppStyle>
    );
}

const AppStyle = styled.div`
    color : ${props => props.color};
`;

export default App;