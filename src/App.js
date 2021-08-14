import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(toyData => this.setState({toys: toyData}))
  }

  addNewToy = (newToy) => {
    this.setState({
      toys: [...this.state.toys, newToy]
    });
  }

  deleteToy = (deletedToyId) => {
    this.setState({
      toys: this.state.toys.filter(toy => toy.id !== deletedToyId)
    })
    fetch("http://localhost:3000/toys/" + deletedToyId, {
      method: "DELETE"
    })
  }

  likeToy = (likedToy) => {
    let toys = this.state.toys.filter(toy => toy !== likedToy);
    likedToy.likes += 1;
    this.setState({
      toys:[...toys, likedToy]
    });

    fetch("http://localhost:3000/toys/" + likedToy.id, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(likedToy)
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer likeToy={this.likeToy} deleteToy={this.deleteToy} toys={this.state.toys}/>
      </>
    );
  }

}

export default App;
