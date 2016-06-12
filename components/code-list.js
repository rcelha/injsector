const React = require('react')

export class CodeList extends React.Component {
  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}
