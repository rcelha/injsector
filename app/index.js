/* global window */
const React = require('react')
import {CodeList} from './components/code-list'

export class App extends React.Component {
  render () {
    return (
      <div className='container-fluid'>
        <header>
          <h1>{'In{JS}ector'}</h1>
        </header>
        <main>
          <CodeList />
        </main>
        <footer>
          <span><a href='#'>about</a></span>
        </footer>
      </div>
    )
  }
}
