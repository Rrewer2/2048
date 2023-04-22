import { useEffect, useState } from "react";
import Grid from "./components/grid/Grid";
import List from "./components/list/List.";
import Overlay from "./components/overlay/Overlay";
import Start from "./components/start/Start";
import { keyIncludes, fillField, xyFromTouches } from "./services/functions";
import { firstInit, compareArrays, normalize } from "./services/functions";
import { arrayEmpties, addNewElem, verifyArray } from "./services/functions";
import { getArrayAfterMove, commandByTouch } from "./services/functions";
import "./App.css";
import Header from "./components/header/Header";

const App = () => {
    const [array, setArray] = useState(fillField(-1));
    const [status, setStatus] = useState(2);
    const [transEnded, setWaitTransEnded] = useState(false);
    const [animEnded, setWaitAnimEnded] = useState(false);
    const [touchStart, setTouchStart] = useState([0, 0]);
    const [touchEnd, setTouchEnd] = useState([0, 0]);

    const handleTouchStart = ({ touches }) => {
        const xy = xyFromTouches(touches);
        setTouchStart(xy);
        setTouchEnd(xy);
    };
    const handleTouchMove = ({ touches }) =>
        setTouchEnd(xyFromTouches(touches));
    const handleTouchEnd = () => {
        const command = commandByTouch(touchStart, touchEnd);
        if (command) handleKeyDown({ code: command });
    };

    const handleKeyDown = ({ code }) => {
        if (!keyIncludes(code)) return;
        if (animEnded || transEnded) return;
        if (code === "Enter" && status === 1) return;
        const movedArray = getArrayAfterMove(code, array);
        const setAll = () => {
            setArray(movedArray);
            setWaitTransEnded(true);
            setWaitAnimEnded(true);
        };
        if (code === "Enter") {
            setStatus(2);
            setAll();
        }
        if (status > 1 || !compareArrays(array, movedArray)) setAll();
    };

    useEffect(() => {
        if (status > 1 && transEnded) {
            setWaitTransEnded(false);
            setWaitAnimEnded(false);
            setStatus(1);
            return setArray(firstInit(array));
        }
        if (!transEnded && animEnded) {
            const normed = normalize(array);
            const replacedArr = addNewElem(normed);
            setArray(replacedArr);
            const emptiesLength = arrayEmpties(normed).length;
            if (emptiesLength === 1 && verifyArray(replacedArr)) setStatus(0);
        }
    }, [transEnded]);

    return (
        <div className="app">
            <Header array={array} status={status} />
            <main className="flex-center main">
                <Start status={status} handleKeyDown={handleKeyDown} />
                <div
                    className="grid"
                    onTransitionEnd={() => setWaitTransEnded(false)}
                    onAnimationEnd={() => setWaitAnimEnded(false)}
                >
                    <List />
                    <Grid array={array} />
                </div>
                <Overlay
                    handleKeyDown={handleKeyDown}
                    status={status}
                    handleTouch={{
                        handleTouchStart,
                        handleTouchMove,
                        handleTouchEnd,
                    }}
                />
            </main>
            <footer className="flex-center footer"></footer>
        </div>
    );
};

export default App;
