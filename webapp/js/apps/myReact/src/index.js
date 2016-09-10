var Header = require('../../../components/header.jsx')
var HelloMessage = React.createClass({
  render: function() {
    return (
      <div>
        <Header title='GUOSHENCHENG'/>
      </div>
    )
  }
})

var container = document.body
ReactDOM.render(<HelloMessage name="Guoshencheng" />, container)
