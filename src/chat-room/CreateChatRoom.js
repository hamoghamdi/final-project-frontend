import React, { Component } from 'react';
import { create } from "./chatrooms-api";
import { withRouter } from "react-router-dom";

class CreateChatRoom extends Component {
  state = {
    dataForm: {
      title: ""
    }
  };

  handleChange = event => {
    //get the name of input
    const name = event.target.name;
    // get the value of input
    const value = event.target.value;
    const newForm = Object.assign(this.state.dataForm);
    newForm[name] = value;
    this.setState({
      dataForm: newForm
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newRoom = this.state.dataForm;
    const user = this.props.user;
    create(user, newRoom)
      .then(() => alert("created"))
      .then(() => this.props.history.push("/chatrooms"))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title</label>
        <input
          onChange={this.handleChange}
          type="text"
          name="title"
          value={this.state.dataForm.title}
        />
        {/* <label>Image</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="imageUrl"
              value={this.state.dataForm.imageUrl}
            /> */}
        <button type="submit">Create</button>
      </form>
    );
  }
}

export default withRouter(CreateChatRoom);