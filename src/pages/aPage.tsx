import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ExampleAction } from "../reduxes/exampleRedux";
import busIcon from "../assets/icon/busIcon.svg";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function APage() {
    //action trigger hook
    const dispatch = useDispatch();
    //state manage
    const [data, setData] = useState("hihi");
    //react cookie
    const [cookie, setCookie, removeCookie] = useCookies(["test"]);

    //react lifcycle
    useEffect(() => {
        const loadingTest = setTimeout(() => {
            setData("로딩끝");
        }, 2000);

        return () => {
            clearTimeout(loadingTest);
        };
    }, []);

    const handleExampleAction = () => {
        //redux action trigger
        dispatch(
            ExampleAction({
                name: "안뇽",
                email: "하세요",
            })
        );
    };

    const handleChangeEnv = () => {
        //환경변수 사용
        console.log(process.env.ENV_KEY);
    };

    return (
        <>
            A페이지
            <Link to="/">app으로 이동하기</Link>
            <p>{cookie.test || "no cookie"}</p>
            <p>{data}</p>
            <img src={busIcon} alt="example" width="200px" height="200px" />
            <button
                onClick={() => {
                    setCookie("test", "hello cookie", { path: "/" });
                }}
            >
                쿠기 생성
            </button>
            <button
                onClick={() => {
                    removeCookie("test");
                }}
            >
                쿠기 삭제
            </button>
            <button onClick={handleExampleAction}>액션 발동시키기</button>
            <button onClick={handleChangeEnv}>env 값 확인하기</button>
        </>
    );
}

export default APage;
