import { useEffect, useState } from "react";

//scroll 커스텀 hook
function useScroll() {
    const [state, setState] = useState({
        x: 0,
        y: 0,
    });

    const onScroll = () => {
        setState({ x: window.scrollX, y: window.scrollY });
    };

    useEffect(() => {
        onScroll();
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return state;
}

export default useScroll;
