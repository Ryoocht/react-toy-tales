import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: "",
    image: "",
    likes: 0
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(toyData => this.props.addNewToy(toyData))
  }

  render() {
    return (
      <div onSubmit={this.handleSubmit} className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={e => this.setState({name: e.target.value})} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={e => this.setState({image: e.target.value})} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
