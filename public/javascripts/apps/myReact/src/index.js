var Header = require('../../../components/header.jsx')
var HelloMessage = React.createClass({
  render: function() {
    return (
      <div>
        <Header title='GUOSHENCHENG'/>
        <div>Hellp {this.props.name}</div>
      </div>
    )
  }
})

var container = document.getElementById('container')
ReactDOM.render(<HelloMessage name="Guoshencheng" />, container)
