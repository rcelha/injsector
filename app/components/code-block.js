const React = require('react')

export class CodeBlock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id,
      url: props.url,
      code: props.code,
      isCode: props.isCode || '0'
    }
  }

  onCancelClick () {
    this.setState({
      url: this.props.url,
      code: this.props.code,
      isCode: this.props.isCode
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
    const codeComponent = (this.state.isCode === '0') ? (
      <span>
        <label htmlFor='url'>URL</label>
        <input ref='url' type='url' onChange={this.onChangeField.bind(this, 'url')} value={this.state.url} />
      </span>
      ) : (
      <span>
        <label htmlFor='code'>Code</label>
        <textarea ref='code' onChange={this.onChangeField.bind(this, 'code')} value={this.state.code}></textarea>
      </span>
      )

    return (
      <fieldset>
        <p>{codeComponent}</p>
        <p>
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.onCancelClick.bind(this)}>Reset</button>
          <button onClick={this.onRemoveClick.bind(this)}>Remove</button>
        </p>
        <p>
          <label htmlFor='isCode'>Type</label>
          <select ref='isCode' value={this.state.isCode} onChange={this.onChangeField.bind(this, 'isCode')}>
            <option value='0'>URL</option>
            <option value='1'>Code Block</option>
          </select>
        </p>
      </fieldset>
    )
  }
}
