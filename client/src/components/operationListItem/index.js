import React from 'react';
import './style.css'

function operationListItem(props) {
    return (
        <li><div
            id={props.id}
            value={props.value}
            onClick={() => props.hideDropdownMenu(props.value)}
            className="dropdown-button"
        >{props.text}</div></li>
    )
}

export default operationListItem;