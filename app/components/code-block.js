const React = require('react')

export class CodeBlock extends React.Component {

  getStateDict (props) {
    props = (props === undefined) ? this.props : props
    return {
      id: props.id,
      url: props.url,
      code: props.code,
      isCode: props.isCode || '0',
      urlMatch: props.urlMatch || '',
      replaceSrcMatch: props.replaceSrcMatch || '',
      replaceTextMatch: props.replaceTextMatch || ''
    }
  }

  constructor (props) {
    super(props)
    this.state = this.getStateDict(props)
  }

  onCancelClick () {
    this.setState(this.getStateDict())
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
        <p>
          <label htmlFor='isCode'>Type</label>
          <select ref='isCode' value={this.state.isCode} onChange={this.onChangeField.bind(this, 'isCode')}>
            <option value='0'>URL</option>
            <option value='1'>Code Block</option>
          </select>
        </p>
        <p>{codeComponent}</p>
        <p>
          <label htmlFor='urlMatch'>Run only on domains that match:</label>
          <input ref='urlMatch' type='text' onChange={this.onChangeField.bind(this, 'urlMatch')} value={this.state.urlMatch} />
        </p>
        <p>Replace Element Options:</p>
        <p>
          <label htmlFor='replaceSrcMatch'>SRC Pattern</label>
          <input ref='replaceSrcMatch' type='text' onChange={this.onChangeField.bind(this, 'replaceSrcMatch')} value={this.state.replaceSrcMatch} />
        </p>
        <p>
          <label htmlFor='replaceTextMatch'>Content Pattern</label>
          <input ref='replaceTextMatch' type='text' onChange={this.onChangeField.bind(this, 'replaceTextMatch')} value={this.state.replaceTextMatch} />
        </p>
        <p>
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.onCancelClick.bind(this)}>Reset</button>
          <button onClick={this.onRemoveClick.bind(this)}>Remove</button>
        </p>
      </fieldset>
    )
  }
}
