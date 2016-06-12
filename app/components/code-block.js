const React = require('react')

export class CodeBlock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {url: props.url, id: props.id}
    this._currValue = props.url
  }

  handleKey (evt) {
    if (evt.key === 'Escape') {
      this.setState({url: this.props.url})
    } else if (evt.key === 'Enter') {
      this.props.handleSave(this.state)
    }
  }

  handleUrlChange (evt) {
    this.setState({url: evt.target.value})
  }

  render () {
    return (
      <div>
        <input type='url'
          title='[Esc] to cancel | [Return] to save'
          onKeyDown={this.handleKey.bind(this)}
          onChange={this.handleUrlChange.bind(this)}
          value={this.state.url} />
      </div>
    )
  }
}
