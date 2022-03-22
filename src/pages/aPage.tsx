import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ExampleAction } from "../store/actions/exampleAction";

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
            <Link to="/" >app으로 이동</Link>
            <button onClick={handleExampleAction}>액션 발동시키기</button>
        </>
    );
}

export default APage;