const React = require('react')

class StageSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  onChange (e) {
    this.setState({value: e.target.value})
  }

  render () {
    return (
      <select onChange={this.onChange.bind(this)} >
        <option>First</option>
        <option>Before</option>
        <option>After</option>
      </select>
    )
  }
}

class ScopeSelector extends React.Component {
  render () {
    return (
      <select>
        <option>This address</option>
        <option>*</option>
      </select>
    )
  }
}

class CodeSelector extends React.Component {
  render () {
    return (
      <input type='text'></input>
    )
  }
}

export class CodeBlock extends React.Component {
  render () {
    return (
      <div>
        <span><StageSelector /></span>
        <span><CodeSelector /></span>
        <span><ScopeSelector /></span>
      </div>
    )
  }
}
