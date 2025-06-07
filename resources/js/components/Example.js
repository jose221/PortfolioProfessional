import React from 'react';
import Button from '@mui/material/Button';
import renderComponent from '../utils/renderComponent';

const Example = () => {
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
};

export default Example;

if (document.querySelector("example")) {
    renderComponent(Example, document.querySelector("example"));
}
