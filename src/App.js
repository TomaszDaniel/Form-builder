import React, { Component } from 'react';
import MainInput from './components/MainInput';
import './App.css';

class App extends Component {
  state = {
    data: []
  }

  handleClick = () => {
    let data = this.state.data
    const obj = {
      id: Math.floor(Math.random() * 99999999)
    }
    data.push(obj)
    this.setState({
      data
    })
  }

  handleDelete = (item) => {
    console.log(item);
    let data = this.state.data;
    console.log(data[0]);
    for (let i = 0; i < data.length; i++) {
      if (item === data[i]) {
        data.splice(i, 1)
      }
    }
    this.setState({
      data
    })
  }

  render() {
    return (
      <>
        {(this.state.data.length > 0) ? (
          <ul>{
            this.state.data.map(item => (
              <li key={item.id}>
                <MainInput delete={this.handleDelete} item={item} />
              </li>
            ))}
          </ul>
        )
          : null}
        <button className="addInput" data={this.state.data} onClick={this.handleClick}>Add Input</button>
      </>
    );
  }
}

export default App;
