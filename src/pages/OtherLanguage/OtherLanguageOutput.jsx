function recursiveOutput(output) {

    if(output==undefined || output==null) {
        return <div className="output"></div>;
    }

    if(output?.compile?.stderr || output?.run?.stderr)
    {
        return <div className="output">
            <div className="output-title">Error:</div>
            <pre>{`${(output?.compile?.stderr||output?.run?.stderr).replace("/piston/jobs/", "api/")}`}</pre>
        </div>;
    }

    if(output?.run?.stdout)
    {
        return <div className="output">
            <pre>{`${output.run.stdout}`}</pre>
        </div>;
    }

    return Object.keys(output).map((key) => {
        if(output[key]==undefined || output[key]==null) {
            return <div key={key} className="output"></div>;
        }
        else if (typeof output[key] === "object") {
            return <div key={key} className="output">
                <div className="output-title">{key}</div>
                {recursiveOutput(output[key])}
            </div>;
        } else {
            return <div key={key} className="output">
                <div className="output-title">{key}:<pre>{`${output[key]}`}</pre></div>
            </div>;
        }
    });
}

function OtherLanguageEditorOutput({ output }) {
	return <div className="markdownoutput" style={{minHeight:"40vh",}}>
        <div className="editor-title md-output-title" style={{width:"100%"}}>Output</div>
        <div style={{wordWrap:"break-word",overflow:"auto"}}>{recursiveOutput(output)}</div>
    </div>;
}

export default OtherLanguageEditorOutput;
