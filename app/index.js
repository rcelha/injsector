const React = require('react')
import {CodeList} from './components/code-list'

var fakeData = {
  '1y928y3912': {'url': 'http://www.bla.com/foo.js'},
  '1jd8021j': {'url': 'http://www.bla.com/bla.js'}
}

export class App extends React.Component {
  render () {
    return (
      <div>
        <header>
          <h1>{'In{JS}ector'}</h1>
        </header>
        <main>
          <CodeList data={fakeData} />
        </main>
        <footer>
          <span><a href='#'>about</a></span>
        </footer>
      </div>
    )
  }
}
