import React, { Component } from 'react';
import MainInput from './components/MainInput';
import SubInput from './components/SubInput';
import './App.css';

import db from "./components/db"

class App extends Component {
  state = {
    myData: []
  }

  componentDidMount() {
    db.table('myData')
      .toArray()
      .then((myData) => {
        this.setState({ myData });
      });
  }

  handleClick = () => {
    const obj = {
      id: Math.floor(Math.random() * 99999999)
    }
    db.table('myData')
      .add(obj)
      .then(() => {
        const newList = this.state.myData
        newList.push(obj)
        this.setState({ myData: newList });
      });
  }

  handleDelete = (item) => {
    const data = this.state.myData;
    const findObjToDelete = (data) => {
      for (let k in data) {
        if (data[k].id === item.id) {
          data.splice(k, 1)
        } else {
          if (typeof data[k] !== 'string') {
            findObjToDelete(data[k])
          }
        }
      }
    }
    db.table('myData')
      .delete(item.id)
      .then(() => {
        findObjToDelete(data)
        this.setState({ myData: data });
      });
  }

  handleAddInput = (item, option) => {
    const data = this.state.myData;
    const obj = {
      id: Math.floor(Math.random() * 99999999),
      type: option
    }
    const findObj = (data) => {
      for (let k in data) {
        if (data[k].id === item.id) {
          if (typeof data[k].subInputs === "object") {
            data[k].subInputs.push(obj)
          } else {
            // data[k].subInputs = []
            data[k].subInputs.push(obj)
          }
        } else {
          if (typeof data[k] !== 'string') {
            findObj(data[k], option)
          }
        }
      }
    }
    db.table('myData')
      .update(item, {
        subInputs: []
      })
      .then(() => {
        findObj(data)
        this.setState({ myData: data });
      });

  }

  render() {
    return (
      <>
        {(this.state.myData.length > 0) ? (
          <ul>{
            this.state.myData.map(item => (
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
