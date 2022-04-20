import { useSelector } from "react-redux";
import { RootReducerType } from "reduxes";
import profileIcon from "../assets/icon/ic-nav-profile2.png";
import sinImage from "../assets/image/sin.jpg";
import * as metaMask from "../modules/metamask";
import * as kaikas from "../modules/kaikas";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

function HomePage() {
    //react router hook
    const navigate = useNavigate();
    const [cookie] = useCookies(["test"]);
    //redux 상태값 가져오기
    const { name, email } = useSelector(
        (state: RootReducerType) => state.ExampleReducer
    );
    const { Metaaddress, Metaname, Metabalance, Metaconnect } = useSelector(
        (state: RootReducerType) => state.UserWalletMetaReducer
    );
    const { Kaiaddress, Kainame, Kaibalance, Kaiconnect } = useSelector(
        (state: RootReducerType) => state.UserWalletKaiReducer
    );
    const { isPc } = useSelector(
        (state: RootReducerType) => state.NowMediaQueryReducer
    );

    const handleGoApage = () => {
        if (Metaconnect || Kaiconnect) {
            //react routing
            navigate("/aPage");
        } else {
            alert("Please conncet wallet");
        }
    };

    return (
        <HomePageStyle>
            <div className="pflex">
                <p>{name}</p>
                <p>{email}</p>
                <p>{cookie.test}</p>
            </div>
            <br />
            <div>
                <p>{Metaname}</p>
                <p>{Metaaddress}</p>
                <p>{Metabalance}</p>
            </div>
            <br />
            <div>
                <p>{Kainame}</p>
                <p>{Kaiaddress}</p>
                <p>{Kaibalance}</p>
            </div>
            <br />
            <p>{process.env.ENV_KEY}</p>
            <p>{isPc ? "Pc" : "Mobile"}</p>
            <img src={profileIcon} alt="profile" width="200px" height="200px" />
            <img src={sinImage} alt="profile" width="200px" height="200px" />
            <button onClick={metaMask.handleConnectMeta}>metamask연결</button>
            <button onClick={kaikas.handelConnectKai}>kaikas연결</button>
            <button onClick={handleGoApage}>a 페이지로 이동</button>
        </HomePageStyle>
    );
}

//styled-components
const HomePageStyle = styled.div`
    font-size: 1.5rem;
`;

export default HomePage;
