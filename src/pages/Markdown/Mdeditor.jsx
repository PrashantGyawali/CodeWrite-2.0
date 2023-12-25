import NavComponent from '../../components/Navbar';
import Editor from './MdEditorComponent';
import 'bootstrap/dist/css/bootstrap.css';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react';
import '../../App.css'
import '../Editor/styles/Editor.css'
import useLocalStorage from '../../hooks/localstorage';

//for syntax highlighting in markdown
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };





  function MarkdownOutput(props){
    return  (<div className='text-light markdownoutput'>
        <div className="editor-title css md-output-title">Output</div>
                <div className='pl-10'>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={CodeBlock}>{props.markdown}</Markdown>
                </div>
            </div>)
}


export default function MarkdownEditor(){
    const[markdown,setMarkdown]  = useLocalStorage("markdown",`# Drag and drop your Markdown file here or start writing`);
    const [mdMinimize, setMdMinimize] = useState(false);

    const handleMinimize = (resize) => {
        if(!resize)
        {
          if(mdMinimize==false)
          {
            setMdMinimize(true);
          }
          else{
            setMdMinimize(false);
          }
        }
        else{
            setMdMinimize("resize");
        }
    }
    return (
        <>
        <NavComponent/>
        <div className="d-sm-flex mdeditor-container" >
            <Editor language="markdown" displayname="Markdown" value={markdown} onChange={setMarkdown} minimized={mdMinimize} handleMinimize={handleMinimize}/>
            <MarkdownOutput markdown={markdown}/>
        </div>
        </>
    )  
}
            


