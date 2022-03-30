import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './reset.css';
import './setRem.css'
import styled from 'styled-components';
import profileIcon from "./assets/icon/ic-nav-profile2.png";
import sinImage from "./assets/image/sin.jpg";
import { RootReducerType } from 'reduxes';
import { useEffect } from 'react';
import * as metaMask from "./modules/metamask";
import * as kaikas from "./modules/kaikas"
import { UserWalletMetaAction } from './reduxes/userWalletMetaRedux';
import { UserWalletKaiAction } from './reduxes/userWalletKaiRedux';

function App() {

    const navigate = useNavigate();
    const { name, email } = useSelector((state : RootReducerType) => state.ExampleReducer);
    const { Metaaddress, Metaname, Metabalance } = useSelector((state : RootReducerType) => state.UserWalletMetaReducer);
    const { Kaiaddress, Kainame, Kaibalance } = useSelector((state : RootReducerType) => state.UserWalletKaiReducer);
    const dispatch = useDispatch();
    let ethereum : any;
    let klaytn : any;

    const handleGoApage = () => {
        navigate('/aPage');
    }

    useEffect(()=>{
        if(window.ethereum || window.klaytn) {
            handleEtherium();

            const connectWallet = setInterval(async ()=>{
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
                            Metaname : 'Metamask',
                            Metabalance : resultMeta?.balance
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
                            Kainame : 'Kaikas',
                            Kaibalance :  resultKai?.balance
                        }))
                    }
                }
            },3000)
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
            window.ethereum.on('accountsChanged', (accounts : any)=>{
                let address;
                if(accounts.length > 0) {
                    address = accounts[0];
                    console.log(address);
                    dispatch(UserWalletMetaAction({
                        Metaaddress : address,
                        Metaname,
                        Metabalance
                    }))
                }
            })
        }
        if(typeof window.klaytn !== 'undefined') {
            window.klaytn.on('accountsChanged',(accounts : any) => {
                let address;
                if(accounts.length > 0) {
                    address = accounts[0]
                    console.log(address);
                    dispatch(UserWalletKaiAction({
                        Kaiaddress : address,
                        Kainame,
                        Kaibalance
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

    const handleConnectMeta = () => {
        if(!window.ethereum.selectedAddress) {
            if(metaMask.beforeWalletCheckMeta() === true) {
                metaMask.connectWalletMeta(ethereum).then((addr) => {
                    console.log(addr);
                })
            }
        }
        else {
            console.log('Metamask is already connected');
        }
    }

    const handelConnectKai = () => {
        if(!window.klaytn.selectedAddress) {
            kaikas.connectWalletKai(klaytn).then((addr)=>{
                console.log(addr);
            })
        }
        else {
            console.log('Kaikas is already connected');
        }
    }

    return (
        <AppStyle color='green'>
            <div className='pflex'>
                <p>{name}</p>
                <p>{email}</p>
            </div><br/>
            <div>
                <p>{Metaname}</p>
                <p>{Metaaddress}</p>
                <p>{Metabalance}</p>
            </div><br/>
            <div>
                <p>{Kainame}</p>
                <p>{Kaiaddress}</p>
                <p>{Kaibalance}</p>
            </div><br/>
            <p>{process.env.ENV_KEY}</p>
            <img src={profileIcon} alt="profile" width="200px" height="200px" />
            <img src={sinImage} alt="profile" width="200px" height="200px" />
            <button onClick={handleConnectMeta}>metamask연결</button>
            <button onClick={handelConnectKai}>kaikas연결</button>
            <button onClick={handleGoApage}>a 페이지로 이동</button>
        </AppStyle>
    );
}

const AppStyle = styled.div`
    color : ${props => props.color};

    & > .pflex {
        display : flex;
        color : ${props => props.color};
    }
`;

export default App;