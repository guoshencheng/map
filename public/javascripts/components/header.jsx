var styles = require('../../stylesheets/components/header.css')

var Timer = React.createClass({
  getInitialState: function() {
    return {}
  },
  componentDidMount: function() {
  },
  componentWillUnmount: function() {
  },
  render: function() {
    return (
      <div className={styles.container} >
        <p> {this.props.title} </p>
      </div>
    );
  }
})

module.exports = Timer

