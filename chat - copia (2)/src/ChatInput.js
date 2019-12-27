import React, { Component } from "react";
import PropTypes from "prop-types";
import "./chat.css";

class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
  };
  state = {
    message: ""
  };

  render() {
    return (
      <form
        action="."
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmitMessage(this.state.message);
          this.setState({ message: "" });
        }}
      >
        <input
          type="text"
          className="mensaje"
          placeholder={"Enter message..."}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <input
          type="submit"
          className="btn btn-sm btn-outline-primary ml-2"
          value={"Send"}
        />
      </form>
    );
  }
}

export default ChatInput;
