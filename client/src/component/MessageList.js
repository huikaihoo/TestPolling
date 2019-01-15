import React from 'react';

class MessageList extends React.Component {
  constructor(props) {
    super(props);

    const { messages } = this.props;
    this.updateItems(messages);
  }

  componentDidUpdate = () => {
    const { messages } = this.props;
    this.updateItems(messages);
  }

  updateItems = (messages) => {
    this.items = messages.map( (message, index) =>
      <li key={index}>{message}</li>
    );
  }

  render() {
    return (
      <ul>{this.items}</ul>
    );
  }
}

export default MessageList