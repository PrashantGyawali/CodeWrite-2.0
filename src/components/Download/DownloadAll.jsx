import React,{useCallback} from 'react'
import downloadAll from '../../assets/downloadAll.svg'
import { combineIntoHTML } from '../../utils/functions';


function DownloadAll({title,code}) {

  // handle download all
  const handleDownloadAllClick = useCallback(() => {
    const link = document.createElement('a');
    let  downloadableValue=combineIntoHTML(code.html,code.css,code.js);

    const content=new Blob([downloadableValue],{type:`text/xml`,name:"index.html"});
    link.href=URL.createObjectURL(content);
    link.download="index.html";
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
  },[code]);


  return (
<button onClick={handleDownloadAllClick} title={title} className='editor-button'>
    <img src={downloadAll} alt="Download as single HTML file" />
</button>
  )
}

export default React.memo(DownloadAll)