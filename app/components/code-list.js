/* global alert */

const React = require('react')
import {CodeBlock} from './code-block'
import {save, load} from './storage'
import { v4 } from 'uuid'

export class CodeList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      data: {}
    }
    this.load()
  }

  load () {
    load()
      .then((data) => this.setState({data}))
      .catch((err) => alert(`error: ${JSON.stringify(err)}`))
  }

  onSaveItem (item) {
    const id = item.id
    const data = this.state.data
    delete item.id
    data[id] = item
    this.setState({data})
    save(data)
      .then(() => alert('saved'))
      .catch(() => alert('fail'))
  }

  onRemoveItem (item) {
    const id = item.id
    const data = this.state.data
    delete data[id]
    this.setState({data})
    save(data)
      .then(() => alert('saved'))
      .catch(() => alert('fail'))
  }

  addItem () {
    const id = v4()
    const data = this.state.data

    data[id] = {url: '', code: ''}
    this.setState({data})
  }

  render () {
    const blocks = []
    for (let id_ in this.state.data) {
      const piece = this.state.data[id_]
      const block = <CodeBlock {...piece}
        handleSave={this.onSaveItem.bind(this)}
        handleRemove={this.onRemoveItem.bind(this)}
        id={id_}
        key={id_} />

      blocks.push(block)
    }

    return <div id='codeList'>
      {blocks}
      <button onClick={this.addItem.bind(this)}>+</button>
    </div>
  }
}
