import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import MessageList from './component/MessageList'

const socket = io.connect('http://localhost:8080/timer');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastUpdate: 'None',
      name: '',
      pending: '',
      messages: ['Welcome']
    };

    socket.on('timer', timestamp => this.handleTimerChange(timestamp));
    socket.on('broadcast_message', timestamp => this.handleMessagesChange(timestamp));
    socket.emit('subscribe_timer', 1000);
  }

  handleTimerChange = (timestamp) => {
    this.setState( { lastUpdate: timestamp } );
  }

  handleNameChange = (event) => {
    this.setState( { name: event.target.value } );
  }

  handlePendingChange = (event) => {
    this.setState( { pending: event.target.value } );
  }

  handleMessagesChange = (newMessage) => {
    console.log('new message received ', newMessage);
    let messages = this.state.messages;
    messages.push(newMessage);
    this.setState( { messages: messages } );
  }

  sendMessage = () => {
    socket.emit('new_message', this.state.name, this.state.pending);
    this.setState( { pending: "" } );
  }

  render() {
    return (
      <div>
        <h2>Last update: {this.state.lastUpdate}</h2>
        <div>
          Name: <input type="text" onChange={e => this.handleNameChange(e)}/>
        </div>
        <div>
          Message: <input type="text" value={this.state.pending} onChange={e => this.handlePendingChange(e)}/>
          <button onClick={this.sendMessage}>Send</button>
        </div>
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));