import React from 'react'
import downloadIcon from '../../assets/downloadIcon.svg'

export default function Downloadbtn({onClickfn,title}) {
  return (
<button onClick={onClickfn} title={title} className='editor-button'>
    <img src={downloadIcon} alt="download" />
</button>
  )
}
