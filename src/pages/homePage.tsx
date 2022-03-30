import { useSelector } from "react-redux";
import { RootReducerType } from "reduxes";
import profileIcon from "../assets/icon/ic-nav-profile2.png";
import sinImage from "../assets/image/sin.jpg";
import * as metaMask from "../modules/metamask";
import * as kaikas from "../modules/kaikas";
import { useNavigate } from "react-router-dom";

function HomePage () {

    const navigate = useNavigate();
    const { name, email } = useSelector((state : RootReducerType) => state.ExampleReducer);
    const { Metaaddress, Metaname, Metabalance, Metaconnect } = useSelector((state : RootReducerType) => state.UserWalletMetaReducer);
    const { Kaiaddress, Kainame, Kaibalance, Kaiconnect } = useSelector((state : RootReducerType) => state.UserWalletKaiReducer);
    const { isPc } = useSelector((state : RootReducerType) => state.NowMediaQueryReducer);

    const handleGoApage = () => {
        if(Metaconnect || Kaiconnect) {
            navigate('/aPage');
        }
        else {
            alert('Please conncet wallet');
        }
    }

    return (
        <div>
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
            <p>{isPc ? 'Pc' : 'Mobile'}</p>
            <img src={profileIcon} alt="profile" width="200px" height="200px" />
            <img src={sinImage} alt="profile" width="200px" height="200px" />
            <button onClick={metaMask.handleConnectMeta}>metamask연결</button>
            <button onClick={kaikas.handelConnectKai}>kaikas연결</button>
            <button onClick={handleGoApage}>a 페이지로 이동</button>
        </div>
    );
}

export default HomePage;