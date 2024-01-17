import { memo } from "react"
import Modal from 'react-bootstrap/Modal';

const TitleText=memo((props)=>{
    const styelMap={
    "Error !!":"text-danger",
    "Shared 🚀🚀 !!":"text-white",
    "Sharing...":"text-secondary"
}
return (
<Modal.Title className={styelMap[props.title]}>{props.title}</Modal.Title>  )
})

export default TitleText;