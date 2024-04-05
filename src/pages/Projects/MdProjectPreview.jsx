import MarkdownOutput from '../Markdown/MarkdownOutput'

export default function MdProjectPreview({projectInfo, navigate}) {
    return (
    <div onClick={()=>navigate(`/self/md/${projectInfo.id}`)} className='md-project cursor-pointer pe-3 py-1'>
        <div className=' p-2  border-radius-10 subtle-border bg-darker'  style={{width:"100%",height:"40vh",overflow:"scroll",scrollbarWidth:"none",msOverflowStyle: "none"}}>
        <MarkdownOutput markdown={projectInfo.md || "## Empty Project 😱 ... \n\n Nothing to show here 🥴"} />
        </div>
    </div>
        
    )
}
