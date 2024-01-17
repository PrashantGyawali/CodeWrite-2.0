import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { memo, useMemo } from 'react';
// import rehypeRaw from 'rehype-raw';


//for syntax highlighting in markdown
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

const MarkdownOutput=memo((props)=>{
    const remarkPlugins = useMemo(()=>[remarkGfm]);
    return  (<div className='text-light markdownoutput'>
        <div className="editor-title css md-output-title">Output</div>
                <div className='pl-10'>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={remarkPlugins} components={CodeBlock}>{props.markdown}</Markdown>
                </div>
            </div>)
})

export default MarkdownOutput;