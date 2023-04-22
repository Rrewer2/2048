import { useRef, useEffect } from "react";

const Overlay = ({
    handleKeyDown,
    status,
    handleTouch: { handleTouchStart, handleTouchMove, handleTouchEnd },
}) => {
    const ref = useRef(null);
    useEffect(() => ref.current?.focus(), [status]);
    return (
        <div
            className="overlay"
            ref={ref}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        />
    );
};

export default Overlay;
