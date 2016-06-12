import React from 'react'
import ReactDOM from 'react-dom'
import { CodeList } from './components/code-list'
import { CodeBlock } from './components/code-block'

ReactDOM.render(
  (<CodeList>
    <CodeBlock />
    <CodeBlock />
    <CodeBlock />
  </CodeList>), document.getElementById('app')
)
