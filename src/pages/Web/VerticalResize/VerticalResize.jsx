import { memo, useCallback,useState } from "react";
import "./VerticalResize.css";

const VerticalResize = ({ setEditorHeight, editorContainerRef }) => {

    const [resizing, setResizing] = useState(false);

    const handleResize = useCallback((event) => {
        setResizing(true);
        event.stopPropagation();
        document.body.style.userSelect = "none";
        document.body.style.cursor = "row-resize";

        const settingHeight = (e) => {
            e.stopPropagation();
            let t =editorContainerRef.current.getBoundingClientRect().height + (e.type === "touchmove" ? e.touches[0].clientY : e.clientY) -editorContainerRef.current.getBoundingClientRect().bottom + 8;
            setEditorHeight(t);
        };

        const endResize = () => {
            removeEventListener(event.type === "touchstart" ? "touchmove" : "mousemove",settingHeight);
            document.body.style.userSelect = "auto";
            document.body.style.cursor = "auto";
            setResizing(false);
        };

        addEventListener(event.type === "touchstart" ? "touchmove" : "mousemove",settingHeight);
        addEventListener(
            event.type === "touchstart" ? "touchend" : "mouseup",
            endResize
        );

    });

    return (
        <div className={"vertical-resize" + (resizing ? " vertical-resize-active" : "")}
            onMouseDown={handleResize}
            onTouchStart={handleResize}
        ></div>
    );
};

export default memo(VerticalResize);