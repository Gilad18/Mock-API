import React, { Component } from 'react'

 class Input extends Component {
    render() {
        return (
            <div>
                <label>{this.props.name}</label>
                <input value={this.props.value} id={this.props.id} type="text" onChange={this.props.onChange}></input>
            </div>
        )
    }
}

export default Input
