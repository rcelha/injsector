/* global chrome */

const React = require('react')
import {CodeBlock} from './code-block'

export class CodeList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      data: {}
    }
    this.load()
  }

  load () {
    chrome.storage.local.get('injsect-urls', (items) => {
      const urls = items['injsect-urls']
      this.setState({data: urls})
    })
  }

  onSaveItem (item) {
    const id = item.id
    const url = item.url
    const data = this.state.data

    data[id] = {url}
    this.setState({data})

    chrome.storage.local.set({'injsect-urls': data}, () => {
      const opt = {
        type: 'basic',
        title: 'Primary Title',
        message: 'Short message plus an image'
      }
      chrome.notification.create('id-notification', opt, () => {})
    })
  }

  render () {
    const blocks = []
    for (let id_ in this.state.data) {
      const piece = this.state.data[id_]
      const block = <CodeBlock {...piece}
        handleSave={this.onSaveItem.bind(this)}
        id={id_}
        key={id_} />

      blocks.push(block)
    }

    return <div id='codeList'>{blocks}</div>
  }
}
