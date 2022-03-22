import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './reset.css';
import './setRem.css'
import { rootReducerType } from 'store/reducers';
import styled from 'styled-components';
import profileIcon from "./assets/icon/ic-nav-profile2.png";
import sinImage from "./assets/image/sin.jpg";

function App() {

    const navigate = useNavigate();
    const { name, email } = useSelector((state : rootReducerType) => state.ExampleReducer);

    const handleGoApage = () => {
        navigate('/aPage');
    }

    return (
        <AppStyle color='green'>
            <div className='pflex'>
                <p>{name}</p>
                <p>{email}</p>
            </div>
            <p>{process.env.ENV_KEY}</p>
            <img src={profileIcon} alt="profile" width="200px" height="200px" />
            <img src={sinImage} alt="profile" width="200px" height="200px" />
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