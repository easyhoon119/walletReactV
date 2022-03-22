import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ExampleAction } from "../store/actions/exampleAction";
import busIcon from "../assets/icon/busIcon.svg";

function APage () {

    const dispatch = useDispatch();

    const handleExampleAction = () => {
        dispatch(ExampleAction({
            name : '안뇽',
            email : "하세요"
        }))
    }

    return (
        <>
            A페이지
            <Link to="/" >app으로 이동하기</Link>
            <img src={busIcon} alt="example" />
            <button onClick={handleExampleAction}>액션 발동시키기</button>
        </>
    );
}

export default APage;