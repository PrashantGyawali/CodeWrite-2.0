import { memo, useCallback } from "react";
import "./VerticalResize.css";

const VerticalResize = ({ setEditorHeight, editorContainerRef }) => {
    const handleResize = useCallback((event) => {
        event.stopPropagation();
        document.body.style.userSelect = "none";

        const settingHeight = (e) => {
            e.stopPropagation();
            let t =
                editorContainerRef.current.getBoundingClientRect().height + (e.type === "touchmove" ? e.touches[0].clientY : e.clientY) -editorContainerRef.current.getBoundingClientRect().bottom + 12;
            setEditorHeight(t);
        };

        const endResize = () => {
            removeEventListener(
                event.type === "touchstart" ? "touchmove" : "mousemove",
                settingHeight
            );
            document.body.style.userSelect = "auto";
        };

        addEventListener(event.type === "touchstart" ? "touchmove" : "mousemove",settingHeight);
        addEventListener(
            event.type === "touchstart" ? "touchend" : "mouseup",
            endResize
        );

    });

    return (
        <div className="vertical-resize"
            onMouseDown={handleResize}
            onTouchStart={handleResize}
        ></div>
    );
};

export default memo(VerticalResize);