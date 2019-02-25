import React, { Component } from 'react';
import './MainInput.css';

class MainInput extends Component {
    state = {}

    handleDelete = (e) => {
        e.preventDefault();
        this.props.delete(this.props.item);
    }
    render() {
        return (
            <form>
                <div>
                    <label htmlFor="question"> Question  </label>
                    <input type="text" id="question" name="question" />
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <select id="type" name="type">
                        <option>Text</option>
                        <option>Yes / No</option>
                        <option>Number</option>
                    </select>
                </div>
                <div className="buttons">
                    <button className="addSubInput">Add Sub-Input</button>
                    <button className="delete" onClick={(e) => this.handleDelete(e)}>Delete</button>
                </div>
            </form >
        );
    }
}

export default MainInput;