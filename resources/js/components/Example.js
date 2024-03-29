import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
class Example extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">I'm an example component!</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Example;
if (document.querySelector("example")) {
    ReactDOM.render(<Example />, document.querySelector("example"));
}
