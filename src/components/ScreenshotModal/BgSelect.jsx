import React, { memo } from 'react';
import { Button,Dropdown } from "react-bootstrap";
import imageSelectIcon from "../../assets/imageSelectIcon.svg"
import DropdownItem from "../DropdownItem";

const BgSelect= ({ bgType, color, onColorChange, bgStyle, onImageChange, bgImage,colorPickerRef, setBgType,downloadImage, handleClose }) => {
    return (

        <Dropdown className="h-100 postition-relative" style={{width:"min-content"}}>
            <Dropdown.Toggle as="div" variant="dark" id="dropdown-basic" className="pe-1 p-0 d-flex align-items-center rounded-2 h-100" style={{ backgroundColor: "rgb(50, 50, 50)" }}>
            {bgType == "color" && <input type="color" id="colorPicker" value={color} onChange={onColorChange} ref={colorPickerRef} onClick={(e) => e.stopPropagation()} title="Choose Background Color" className="h-80 align-items-center justify-content-center mx-2"></input>}
            {bgType == "image" && (
                <>
                <Button variant="dark" title="Upload Background Image" style={bgStyle}>
                    <label htmlFor="bgImage" onClick={(e) => { e.stopPropagation() }}>
                    <img src={imageSelectIcon} className="cursor-pointer"></img>
                    </label>
                </Button>
                <input type="file" name="bgImage" id="bgImage" className="d-none" accept="image/*" onChange={onImageChange} onClick={(e) => { e.stopPropagation() }} />
                </>
            )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-0 pt-1 position-absolute ">
            <DropdownItem onClick={() => { setBgType("color") }} className="d-flex justify-content-between "><input type="color" id="colorPicker" value={color} onChange={onColorChange} ref={colorPickerRef} title="Choose Background Color" className="normal-color-input"></input>Color</DropdownItem>
            <DropdownItem onClick={() => { setBgType("image") }} className="d-flex justify-content-between align-items-center "><Button variant="dark" title="Upload Background Image " style={bgImage ? { backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", backgroundImage: `url(${bgImage})` } : {}}>
                <label><img src={imageSelectIcon} className="cursor-pointer"></img></label></Button> Image</DropdownItem>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default memo(BgSelect);