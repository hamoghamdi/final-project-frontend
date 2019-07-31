import React, { Component } from 'react';
import { create } from "./chatrooms-api";
import { withRouter } from "react-router-dom";
import "./style.css";

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
    //   .then((room) => {
    //       alert("created")
    //     console.log(room)}) 
        // res.data.room._id
      .then((res) => {
          const id = res.data.room._id
          this.props.history.push(
            `/chatrooms/${id}`
          );})
      .catch(error => console.log("error" + error));
  };

  render() {
    return (
      <div className="Home signdiv ch">
        <form
          className="auth-form welcome-1 signin create-form"
          onSubmit={this.handleSubmit}
        >
          <h3>Create New Room</h3>
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
          <button type="submit" className="sign">
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateChatRoom);