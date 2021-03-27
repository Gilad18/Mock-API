import React, { Component } from 'react'
import Input from './Input'
import Button from './Button'

export class EditCom extends Component {
    render() {
        return (
            <section className="edit">
                <Button onClick={this.props.onClick2} title="Discard" />
                <h3>You can Edit the user here :</h3>
                <h5>User Id : {this.props.id}</h5>
                <Input value={this.props.value1} onChange={this.props.onChange} name={this.props.name}/>
                <Input value={this.props.value2} onChange={this.props.onChange2} name={this.props.name2}/>
                <Button onClick={this.props.onClick} title="Done"/>
            </section>
        )
    }
}

export default EditCom
