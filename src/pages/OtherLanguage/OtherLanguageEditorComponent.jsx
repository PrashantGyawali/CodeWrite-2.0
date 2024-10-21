import {useState, useEffect, useRef, useCallback} from "react";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/xq-dark.css'
import 'codemirror/theme/the-matrix.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/3024-day.css'


import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/edit/matchbrackets'

import 'codemirror/mode/python/python'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clojure/clojure'
import 'codemirror/mode/brainfuck/brainfuck'
import 'codemirror/mode/lua/lua'
import 'codemirror/mode/crystal/crystal'
import 'codemirror/mode/rust/rust'


//css
import "../../App.css"
import "../Editor/styles/Resize.css"
import "../Editor/styles/Editor.css" 

//buttoms
import Downloadbtn from "../../components/Download/Downloadbtn.jsx";
import minimizeIcon from "../../assets/minimize.svg";
import maximizeIcon from "../../assets/maximize.svg";

import { Controlled as ControlledEditor } from "react-codemirror2";

//utils
import { isEmptyExcluding } from "../../utils/functions.js";
import {autoCloseTagsAtom,} from "../../Store/EditorSettingsStore.jsx";
import {themeAtom} from "../../Store/ThemeSettingsStore.jsx";
import { useAtomValue } from "jotai";
import { Button, Dropdown } from "react-bootstrap";
import DropdownItem from "../../components/DropdownItem.jsx";
import contentTypes from "./contentTypes.js";



const Editor = (props) => {
	const { value, onChange, minimized, handleMinimize, fileName, language, onLanguageChange,onRun } = props;
	const { stdin, setStdin } = props;

	const autoCloseTags = useAtomValue(autoCloseTagsAtom);
	const theme = useAtomValue(themeAtom);

	const editorRef = useRef(0);
	const editorContainerRef = useRef(null);
	const [editorWidth, setEditorWidth] = useState("auto");

	const displayName = contentTypes[language].displayName;

	const handleChange = (editor, data, value) => {
		onChange(value);
	};

	useEffect(() => {
		const adjustLines = () => {
			if (window.innerWidth > 768) {
				let is_empty = isEmptyExcluding(value, ["\n", "\t", " "]);
				if (is_empty) {
					let expectedLineCount = Math.min(
						Math.max(
							Math.floor(
								editorRef.current.editor.display
									.lastWrapHeight / 24
							) - 1,
							5
						),
						15
					);
					let newValue =
						contentTypes[language].placeholder +
						"\n".repeat(expectedLineCount - 1);
					onChange(newValue);
				} else {
					onChange(value);
				}
			} else {
				let expectedLineCount = Math.min(
					Math.max(
						Math.floor(
							editorRef.current.editor.display.lastWrapHeight / 24
						) - 1,
						5
					),
					15
				);
				let lineCount = value.split(`\n`).length;
				if (lineCount < expectedLineCount) {
					let newValue =
						value + "\n".repeat(expectedLineCount - lineCount);
					onChange(newValue);
				}
			}
		};

		adjustLines();
	}, []);

	const download = useCallback(() => {
		const link = document.createElement("a");
		const downloadableValue = value;
		const content = new Blob([downloadableValue], {
			type: `${contentTypes[language].type};charset=utf-8`,
		});
		link.href = URL.createObjectURL(content);
		link.download = `fileName${contentTypes[language].displayName}`;
		link.click();
		URL.revokeObjectURL(link.href);
	}, [value]);

	const handleResize = (event) => {
		handleMinimize(true);
		event.stopPropagation();
		document.body.style.userSelect = "none";

		const settingWidth = (e) => {
			e.stopPropagation();
			setEditorWidth(
				editorContainerRef.current.getBoundingClientRect().width +
					(e.type === "touchmove"
						? e.touches[0].clientX
						: e.clientX) -
					editorContainerRef.current.getBoundingClientRect().right
			);
		};

		const endResize = () => {
			removeEventListener(
				event.type === "touchstart" ? "touchmove" : "mousemove",
				settingWidth
			);
			document.body.style.userSelect = "auto";
		};

		addEventListener(
			event.type === "touchstart" ? "touchmove" : "mousemove",
			settingWidth
		);
		addEventListener(
			event.type === "touchstart" ? "touchend" : "mouseup",
			endResize
		);
	};



	const getOutput=async ()=>{
		const output = await fetch("https://emkc.org/api/v2/piston/execute", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				language: language,
				version: contentTypes[language].version,
				files: [
					{
						name: `${fileName.split("").map(e=>e.trim()).join("")}`,
						content: value,
					},
				],
				stdin:stdin,
			}),
		});
		const data = await output.json();
		console.log(data);
		onRun(data);		
		};



	return (
		<div
			className={`editor-container h-90vh ${
				minimized != "resize" ? "markdowneditor" : ""
			} ${minimized == true ? "minimized" : ""}`}
			style={
				minimized === "resize"
					? {
							flex: "0 1 auto",
							width: editorWidth,
							position: "relative",
							minWidth: "200px",
							overflowY: "auto",
							overflowX: "hidden",
					}
					: {}
			}
			ref={editorContainerRef}
		>
			<div className={`editor-title ${language}`}>

					<Dropdown data-bs-theme="dark">
						<Dropdown.Toggle
							variant="dark"
							id="dropdown-basic"
						>
							{fileName}{displayName}
						</Dropdown.Toggle>

						<Dropdown.Menu>
						{Object.keys(contentTypes).map((language) => <DropdownItem key={language} onClick={() => onLanguageChange(language)}>
								{contentTypes[language].displayName}
							</DropdownItem>
						)}               
						</Dropdown.Menu>
					</Dropdown>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						marginLeft: "5px",
					}}
				>
         <button className="editor-button" onClick={getOutput}>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="white" height="20px">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
        </svg>

          </button>
					<Downloadbtn
						onClickfn={download}
						title={"Download " + contentTypes[language].name}
					/>
					<button
						className="editor-button"
						onClick={() => handleMinimize(false)}
					>
						<img
							src={minimized ? maximizeIcon : minimizeIcon}
							alt={!minimized ? "><" : "<>"}
						/>
					</button>
				</div>
			</div>

			<div className={`flexcolgrow ${minimized && "md-minimize"} `}>
				<ControlledEditor
					onBeforeChange={handleChange}
					value={value}
					placeholder={contentTypes[language].placeholder}
					className="code-mirror-wrapper"
					options={{
						lineWrapping: true,
						lint: true,
						inputStyle: "textarea",
						lineNumbers: true,
						mode: `${language=="c"?"clike":language}`,
						theme: theme,
						autoCloseBrackets: autoCloseTags,
						autoCloseTags: autoCloseTags,
						matchBrackets: true,
						undoDepth: 400,
            placeholder:contentTypes[language].placeholder
					}}
					ref={editorRef}
				/>
			</div>
			<div
				className="resizeBar"
				onMouseDown={handleResize}
				onTouchStart={handleResize}
			></div>

		<div>
		<div className="editor-title md-output-title">Input</div>
		<textarea className="input" value={stdin} placeholder={contentTypes[language].stdin||""} onChange={(e)=>{setStdin(e.target.value)}} style={{width:"100%",minHeight:"30px"}}></textarea>
		</div>
		</div>
	);
};

export default Editor;
