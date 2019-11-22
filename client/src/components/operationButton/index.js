import React from 'react';
import './style.css';

function operationButton({ props, children }) {
    return (
        <div className="dd-wrapper">
            <div className="dd-header" onClick={props.toggleList}>
                <div className="dd-header-title"></div>
            </div>
            <ul className="dd-list">
                {props.children}
            </ul>
        </div>
    )
}

export default operationButton;