import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
const [html, setHtml] = useLocalStorage('html', '')
const [css, setCss] = useLocalStorage('css', '')
const [js, setJs] = useLocalStorage('js', '')
const [srcDoc, setSrcDoc] = useState('')

useEffect(() => {
const timeout = setTimeout( () => {
  {/*This function will be executed after 250milliseconds=>0.25seconds*/}
setSrcDoc(`
        <html>
<body>${html}</body>
<style>${css}</style>
<script>${js}</script>
       </html>
`)
}, 250)

return () => clearTimeout(timeout)//if the user makes changes to the HTML, CSS, or JS code before the timeout has been reached, the clearTimeout function is called to cancel the previously set timeout and prevent the update from happening
}, [html, css, js])//whenever any of these variables are updated, the function inside useEffect will run again

  return (
    <>
<div className="pane top-pane">
<Editor language="xml" displayName="HTML" value={html} onChange={setHtml}/>
<Editor language="css" displayName="CSS" value={css} onChange={setCss}/>
<Editor language="javascript" displayName="JS" value={js} onChange={setJs} />
      </div>

      <div className="pane">
<iframe srcDoc={srcDoc} title="output" sandbox="allow-scripts" frameBorder="0" width="100%" height="100%"/>
   </div>

    </>
  )
}

export default App;
