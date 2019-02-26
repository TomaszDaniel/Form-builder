import React, { Component } from 'react';
import './SubInput.css';

class SubInput extends Component {
    state = {}

    handleDelete = (e) => {
        e.preventDefault();
        this.props.delete(this.props.subItem);
    }

    handleAddInput = (e) => {
        e.preventDefault();
        this.props.add(this.props.subItem)
    }
    render() {
        return (
            <>
                <form className="sub_input">
                    <div>
                        <label htmlFor="condition"> Condition  </label>
                        <input type="text" id="condition" name="condition" />
                        <input type="text" id="condition" name="condition" />
                    </div>
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
                        <button className="addSubInput" onClick={(e) => this.handleAddInput(e)}>Add Sub-Input</button>
                        <button className="delete" onClick={(e) => this.handleDelete(e)}>Delete</button>
                    </div>
                </form >
                {(this.props.subItem.subInputs !== undefined) ? (
                    <ul> {
                        this.props.subItem.subInputs.map(item => (
                            <li key={item.id}>
                                <SubInput delete={this.props.delete} add={this.props.add} subItem={item} />
                            </li>
                        ))}
                    </ul>) : null}
            </>
        );
    }
}

export default SubInput;