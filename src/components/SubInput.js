import React, { Component } from 'react';
import './SubInput.css';

class SubInput extends Component {
    state = {
        option: "text"
    }

    handleChange = (e) => {
        this.setState({
            option: e.target.value
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        this.props.delete(this.props.subItem);
    }

    handleAddInput = (e) => {
        e.preventDefault();
        this.props.add(this.props.subItem, this.state.option)
    }
    render() {
        const { type } = this.props.subItem
        return (
            <>
                <form className="sub_input">
                    {(type !== "Number") ?
                        <div>
                            <label htmlFor="condition"> Condition  </label>
                            <input type="text" id="condition" name="condition" />
                            <select id="type" name="type">
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div> : <div>
                            <label htmlFor="condition"> Condition  </label>
                            <select id="condition" name="condition">
                                <option>Equals</option>
                                <option>Grather than</option>
                                <option>Lesser than</option>
                            </select>
                            <input type="text" id="answer" className="answer_input" name="answer" />
                        </div>
                    }
                    <div>
                        <label htmlFor="question"> Question  </label>
                        <input type="text" id="question" name="question" />
                    </div>
                    <div>
                        <label htmlFor="type">Type</label>
                        <select id="type" name="type" value={this.state.option} onChange={this.handleChange}>
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
                {
                    (this.props.subItem.subInputs !== undefined) ? (
                        <ul> {
                            this.props.subItem.subInputs.map(item => (
                                <li key={item.id}>
                                    <SubInput delete={this.props.delete} add={this.props.add} subItem={item} />
                                </li>
                            ))}
                        </ul>) : null
                }
            </>
        );
    }
}

export default SubInput;