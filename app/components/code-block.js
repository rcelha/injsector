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

  changeIsCode (val) {
  }

  render () {
    const codeComponent = (this.state.isCode === '0') ? (
      <input ref='url' type='url' className='form-control' placeholder='URL' onChange={this.onChangeField.bind(this, 'url')} value={this.state.url} />
    ) : (
      <textarea ref='code' className='form-control' placeholder='Code' onChange={this.onChangeField.bind(this, 'code')} value={this.state.code}></textarea>
    )

    return (
      <div>
        <form>
          <div className='clearfix'>
            <div className='dropdown pull-left'>
              <button className='btn btn-default dropdown-toggle' type='button' ref='dropdown-type' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>Type<span className='caret'></span></button>
              <ul className='dropdown-menu' aria-labelledby='dropdown-type'>
                <li><a onClick={() => this.setState({'isCode': '0'})} href='#'>URL</a></li>
                <li><a onClick={() => this.setState({'isCode': '1'})} href='#'>Code</a></li>
              </ul>
            </div>
            <button type='button' className='btn btn-default pull-right' onClick={this.onRemoveClick.bind(this)} aria-label='Remove'>
              <span className='glyphicon glyphicon-remove-sign' aria-hidden='true'></span>
            </button>
          </div>

          <div>
            {codeComponent}
          </div>

          <div className='form-horizontal'>
            <div className='form-group'>
              <label htmlFor='urlMatch' className='col-sm-2  control-label'>Run only on domains that match:</label>
              <div className='col-sm-10'>
                <input ref='urlMatch'
                  type='text'
                  className='form-control'
                  onChange={this.onChangeField.bind(this, 'urlMatch')} value={this.state.urlMatch} />
              </div>
            </div>
            <p>Replace Element Options:</p>
            <div className='form-group'>
              <label htmlFor='replaceSrcMatch' className='col-sm-2 control-label'>SRC Pattern</label>
              <div className='col-sm-10'>
                <input ref='replaceSrcMatch'
                  type='text'
                  className='form-control'
                  onChange={this.onChangeField.bind(this, 'replaceSrcMatch')} value={this.state.replaceSrcMatch} />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='replaceTextMatch' className='col-sm-2 control-label'>Content Pattern</label>
              <div className='col-sm-10'>
                <input ref='replaceTextMatch'
                  type='text'
                  className='form-control'
                  onChange={this.onChangeField.bind(this, 'replaceTextMatch')} value={this.state.replaceTextMatch} />
              </div>
            </div>
          </div>
          <div className='clearfix'>
            <button className='btn btn-default pull-left' onClick={this.onCancelClick.bind(this)}>Reset</button>
            <button className='btn btn-primary pull-right' onClick={this.onSaveClick.bind(this)}>Save</button>
          </div>
        </form>
      </div>
    )
  }
}
