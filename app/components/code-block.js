const React = require('react')

export class CodeBlock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id,
      url: props.url,
      code: props.code
    }
  }

  onCancelClick () {
    this.setState({
      url: this.props.url,
      code: this.props.code
    })
  }

  onRemoveClick (evt) {
    this.props.handleRemove(this.state)
  }

  onSaveClick (evt) {
    this.props.handleSave(this.state)
  }

  onChangeField (field, evt) {
    const s = {}
    s[field] = evt.target.value
    this.setState(s)
  }

  render () {
    return (
      <div>
        <input ref='url' type='url'
          onChange={this.onChangeField.bind(this, 'url')}
          value={this.state.url} />
        <br />
        <textarea ref='code' onChange={this.onChangeField.bind(this, 'code')} value={this.state.code}></textarea>
        <br />
        <button onClick={this.onSaveClick.bind(this)}>save</button>
        <button onClick={this.onCancelClick.bind(this)}>reset</button>
        |
        <button onClick={this.onRemoveClick.bind(this)}>x</button>
      </div>
    )
  }
}
