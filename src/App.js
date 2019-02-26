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
    const data = this.state.data;
    const findObjToDelete = (data) => {
      for (let k in data) {
        if (data[k].id === item.id) {
          data.splice(k, 1)
        } else {
          findObjToDelete(data[k])
        }
      }
    }
    findObjToDelete(data)
    this.setState({
      data
    })
  }

  handleAddInput = (item, option) => {
    const data = this.state.data;
    const findObj = (data) => {
      for (let k in data) {
        if (data[k].id === item.id) {
          const obj = {
            id: Math.floor(Math.random() * 99999999),
            type: option
          }
          if (typeof data[k].subInputs === "object") {
            data[k].subInputs.push(obj)
          } else {
            data[k].subInputs = []
            data[k].subInputs.push(obj)
          }
        } else {
          if (typeof data[k] !== 'string') {
            console.log(data[k]);
            findObj(data[k], option)
          }

        }
      }
    }
    findObj(data)
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
                        <SubInput delete={this.handleDelete} add={this.handleAddInput} subItem={subItem} />
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
