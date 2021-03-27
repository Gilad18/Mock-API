import React, { Component } from 'react'

 class Spinner extends Component {
    render() {
        return (
            <div className="spinner" >
                <div className="loading"></div>
                <h1>Loading Data ...</h1>
            </div>
        )
    }
}

export default Spinner
