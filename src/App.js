import React, { Component } from 'react';
import MainInput from './components/MainInput';
import SubInput from './components/SubInput';
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

    const data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      if (item === data[i]) {
        data.splice(i, 1)
      }
    }
    this.setState({
      data
    })
  }

  handleAddInput = (item) => {
    const data = this.state.data;
    const findValue = (data) => {
      for (let k in data) {
        if (data[k].id === item.id) {
          const obj = {
            id: Math.floor(Math.random() * 99999999)
          }
          if (typeof data[k].subInputs === "object") {
            data[k].subInputs.push(obj)
          } else {
            data[k].subInputs = []
            data[k].subInputs.push(obj)
          }
        } else {
          findValue(data[k])
        }
      }
    }
    findValue(data)
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
                <MainInput delete={this.handleDelete} add={this.handleAddInput} item={item} />

                {(item.subInputs !== undefined) ? (
                  <ul> {
                    item.subInputs.map(subItem => (
                      <li key={subItem.id}>
                        <SubInput delete={this.handleDelete} add={this.handleAddInput} subItem={subItem} item={item} />
                      </li>
                    ))}
                  </ul>) : null}
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
