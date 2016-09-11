require('./navigation.scss')

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
      <div id="navigation" >
        <p className="title_text"> {this.props.title} </p>
      </div>
    );
  }
})

module.exports = Timer

