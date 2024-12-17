import { Cloud } from "react-icon-cloud";
// import EarthImage from "./assets/earth.png"
import backgroundImage from "./assets/cage.png"

function Img({src}) {
    return <a onClick={(e)=>e.preventDefault()}><img src={src} alt="icon"/></a>;
}
const images=[
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clojure/clojure-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/crystal/crystal-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
    ]

const Icons = ()=>{
    return images.map((url,index) => {
        return <Img key={index} src={url} />;
    })
}

const options={
    clickToFront: 1400,
    depth: 0.8,
    imageScale: 0.9,
    initial: [0.1, -0.1],
    outlineColour: '#0000',
    scrollPause:true,
    reverse: true,
    tooltip: 'native',
    tooltipDelay: 1,
    wheelZoom: false,
    maxSpeed: 0.03,
    minSpeed: 0.02,
    activeCursor: "pointer",
    centreImage: backgroundImage,
    shuffleTags: true,
    minBrightness: 0,
};

const IconCloud = () => {
	return (
		<Cloud options={options} canvasProps={{style:{maxWidth:"400px",width:"100%"}}}>
            <Icons/>
		</Cloud>
	);
};

export default IconCloud;