import React, { Component } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import io from "socket.io-client";
import "./chat.css";

const URL = "ws://localhost:3030";
const socket = io("http://localhost:5000");

class Chat extends Component {
  state = {
    name: "",
    messages: []
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      // conectar
      console.log("connected");
    };

    this.ws.onmessage = evt => {
      // agregar
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // si se desconecta conectar
      this.setState({
        ws: new WebSocket(URL)
      });
    };
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }));

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = {
      name: this.state.name,
      message: messageString,
      date: new Date(Date.now()).toLocaleString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: "false"
      })
    };
    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
  };

  onWritting = e => {
    e.preventDefault();

    console.log("escribiendo");

    setTimeout(() => {
      socket.emit("enviado");
    }, 2000);
  };

  render() {
    return (
      <div className="list-wrapper">
        <div className="ventana child">
          {this.state.messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              name={message.name}
              date={message.date}
            />
          ))}
        </div>

        <div className="input mt-5">
          <label htmlFor="name">
            {" "}
            Name:&nbsp;
            <input
              className="name"
              type="text"
              id={"name"}
              placeholder={"Enter your name..."}
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </label>

          <ChatInput
            ws={this.ws}
            onSubmitMessage={messageString => this.submitMessage(messageString)}
            onKeyUp={() => this.onWritting}
          />
        </div>
      </div>
    );
  }
}

socket.on("keyup", function(e) {
  console.log(e.target);
});

export default Chat;
