import React, { Component } from 'react'
import Button from './Button'

 class userCard extends Component {
    render() {
        return (
            <div className="userCard"> 
            <h4>{this.props.name}</h4>
            <Button id={this.props.id} title={this.props.title} onClick={this.props.onClick}/>
            <Button id={this.props.id} title={this.props.title2} onClick={this.props.onClick2}/>
            </div>
        )
    }
}

export default userCard
