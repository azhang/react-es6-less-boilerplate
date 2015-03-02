var React = require('react');

var ReactPropTypes = React.PropTypes;

var MessageListItem = React.createClass({

  propTypes: {
    message: ReactPropTypes.object
  },

  render: function() {
    var message = this.props.message;
    return (
      <li className="message-list-item">
        <h5 className="message-author-name">{message._creator.displayName}</h5>
        <div className="message-time">
          {message._id}
        </div>
        <div className="message-text">{message.title}</div>
      </li>
    );
  }

});

module.exports = MessageListItem;
