import React, { Component } from 'react';
import MainInput from './components/MainInput';
import SubInput from './components/SubInput';
import './App.css';

import db from "./components/db"

class App extends Component {
  state = {
    myData: [],
  }

  componentDidMount() {
    db.table('myData')
      .toArray()
      .then((myData) => {
        this.setState({ myData });
      });
  }
  handleClick = () => {
    const list = this.state.myData
    const idList = list.map(element => element.id)
    const max = Math.max(...idList);
    let newId = 0

    if (max >= 0) {
      newId = max + 1
    }

    const obj = {
      id: newId
    }
    db.table('myData')
      .add(obj)
      .then(() => {
        const newList = this.state.myData
        newList.push(obj)
        this.setState({ myData: newList, });
      });
  }

  handleDelete = (item, mainItem) => {
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
    if (typeof mainItem !== "number") {
      db.table('myData')
        .delete(item.id)
        .then(() => {
          const newList = this.state.myData.filter((data) => data.id !== item.id);
          this.setState({ myData: newList });
        });
    } else {
      db.myData.where('id').equals(mainItem).modify(data => findObjToDelete(data))
      db.table('myData')
        .toArray()
        .then((myData) => {
          this.setState({ myData });
        });
    }
  }

  handleAddInput = (item, option, mainItem) => {
    const obj = {
      id: Math.floor(Math.random() * 99999999),
      type: option
    }
    const findData = (data) => {
      if (data.id === item.id) {
        if (typeof data.subInputs === "object") {
          data.subInputs.push(obj)
        } else {
          data.subInputs = []
          data.subInputs.push(obj)
        }
      } else {
        console.log(data.subInputs);
        for (let k in data.subInputs) {
          findData(data.subInputs[k])
        }
      }
    }

    if (typeof mainItem !== "number") {
      db.myData.where('id').equals(item.id).modify(data => {
        if (typeof data.subInputs === "object") {
          data.subInputs.push(obj)
        } else {
          data.subInputs = [];
          data.subInputs.push(obj)
        }
      })
    } else {
      db.myData.where('id').equals(mainItem).modify(data => findData(data))
    }

    db.table('myData')
      .toArray()
      .then((myData) => {
        this.setState({ myData });
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
