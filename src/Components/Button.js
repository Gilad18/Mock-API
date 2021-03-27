import React, { Component } from 'react'

 class Button extends Component {
    render() {
        return (
            <div>
                <button className="btn"  id={this.props.id} onClick={this.props.onClick}>{this.props.title}</button>
            </div>
        )
    }
}

export default Button
