import { useRef, useEffect } from "react";
import "./Cover.css";

const Cover = ({
    handleKeyDown,
    status,
    handleTouch: { handleTouchStart, handleTouchMove, handleTouchEnd },
}) => {
    const ref = useRef(null);
    useEffect(() => ref.current?.focus(), [status]);
    return (
        <div
            className="cover"
            ref={ref}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        />
    );
};

export default Cover;
