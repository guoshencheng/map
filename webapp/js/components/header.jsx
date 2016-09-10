var styles = require('../../reactcss/dist/header.css')

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
        <p className={styles.title_text}> {this.props.title} </p>
      </div>
    );
  }
})

module.exports = Timer

