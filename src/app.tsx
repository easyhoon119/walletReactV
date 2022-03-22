import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './app.css';
import { rootReducerType } from 'store/reducers';
import styled from 'styled-components';

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