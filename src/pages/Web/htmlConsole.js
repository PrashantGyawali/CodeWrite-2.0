import {convertConsoleLogs} from "../../utils/functions"

export default function htmlWithConsole(html,css,js,showConsole,showConsoleOnError)
{
  
  
  let consoleId=generateRandomString();
  let htmlId=generateRandomString();
  let consoleTabId=generateRandomString();
  let htmlTabId=generateRandomString();

  let showConsoleOnErrorFunction=" ";
  let convertedText=""
  if(showConsoleOnError)
  {
      showConsoleOnErrorFunction= "showConsole();";
  }
  if(!showConsole)
  {
      convertedText=`
      <html>
      <style>${css.trim()}
      </style>
      <body style="margin:0px">
      ${html.trim()}
      </body>
      <script defer>
      ${js.trim()}
      </script>
      </html>`

  }
  else{   
  const parsedCss = processCss(css, htmlId);
  convertedText=`
  <html>
  <style>

  ${parsedCss}

  </style>
  <body style="margin:0px;position:relative">
  <div class="tabs" style="display:flex;width:100%;box-sizing:border-box; background-color:rgb(36,36,36);position:sticky; top:0px; padding:0px 2px 0px 0px; gap:3px;">
  <button  id="${htmlTabId}" style="text-decoration:none;font-size:18px; padding:4px; background-color:rgb(73, 80, 87); color:white;border:1px solid rgb(157 157 157);  border-radius:5px 5px 0px 0px">HTML</button>
  <button id="${consoleTabId}" style="text-decoration:none !important;padding:4px; font-size:18px;background-color:rgb(33, 37, 41); color:white;border:2px solid rgb(57 57 57); border-radius:5px 5px 0px 0px">Console</button>
  </div>
  <div id="${htmlId}">
  ${html.trim()}
  </div>
  <div id="${consoleId}" style="background: linear-gradient(to bottom, rgba(36,36,36,1) 50%, rgb(100,100,100) ); border-bottom: rgb(41,0,155) 4px solid; color:red; font-size:20px; height:88vh; overflow-y:hidden;"></div>
  </body>

  <script defer>
  document.getElementById("${consoleTabId}").addEventListener("click",()=>showConsole());
  document.getElementById("${htmlTabId}").addEventListener("click",()=>showHTML());

  //handling errors
  window.onerror = function(message, source, lineno, colno, error) {
    ${showConsoleOnErrorFunction}
    document.getElementById("${consoleTabId}").style.border="2px solid red";
    document.getElementById("${consoleId}").innerText+=error;
  };  
  
  document.getElementById("${consoleId}").style.display="none";
  function showConsole(){
    document.getElementById("${consoleId}").style.display="block";
    document.getElementById("${htmlId}").style.display="none";
    document.getElementById("${htmlTabId}").style.backgroundColor="rgb(0,0,0)";
    document.getElementById("${htmlTabId}").style.border="2px solid rgb(57 57 57)"
    document.getElementById("${consoleTabId}").style.color="white";
    document.getElementById("${consoleTabId}").style.backgroundColor="rgb(73, 80, 87)";
    document.getElementById("${consoleTabId}").style.border="1px solid rgb(150,150,150)";
  }
  function showHTML(){
    document.getElementById("${htmlId}").style.display="block";
    document.getElementById("${consoleId}").style.display="none";
    document.getElementById("${consoleTabId}").style.backgroundColor="rgb(0,0,0)";
    document.getElementById("${consoleTabId}").style.color="white";
    document.getElementById("${consoleTabId}").style.border="2px solid rgb(57 57 57)";
    document.getElementById("${htmlTabId}").style.backgroundColor="rgb(73, 80, 87)";
    document.getElementById("${htmlTabId}").style.border="1px solid rgb(150,150,150)";

  }
  </script>

  <script defer>
  function tableToString(data) {
    let result = '';
    if (Array.isArray(data)) {
      result += Object.keys(data[0]).join('\t') + '\\n';
      data.forEach(row => {
        result += Object.values(row).join('\t') + '\\n';
      });
    }
    return result;
  }

    ${convertConsoleLogs(js,consoleId)}

  </script>
</html>`
}
return convertedText;
}

function generateRandomString() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let randomString = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  
    for (let i = 0; i < 9; i++) {
      const pool = i % 2 === 0 ? alphabet : numbers;
      randomString += pool.charAt(Math.floor(Math.random() * pool.length));
    }
  
    return randomString;
  }

  function processCss(css, htmlId) {
    // Split the CSS by '}'
    const rules = css.split('}');
  
    // Process each rule
    const processedRules = rules.map(rule => {
      const trimmedRule = rule.trim();
  
      // Check if the rule contains 'body'
      if (trimmedRule.includes('body')) {
        // Replace 'body' with '#htmlId'
        return trimmedRule.replace(/\bbody\b/g, `#${htmlId}`);
      } else if (trimmedRule.length > 0) {
        // Wrap the rule inside '#htmlId'
        return `#${htmlId} { ${trimmedRule} }`;
      } else {
        // Empty rule, return as is
        return rule;
      }
    });
  
    // Join the processed rules back together
    const processedCss = processedRules.join('}');
  
    return processedCss;
  }
  