import React, { Component } from 'react';
import OperationListItem from "./components/operationListItem";
import operations from './operations.json';
import './App.css';


class Dropdown extends Component {
  state = {
    operations: operations,
    currentOperation: "Choose Operation",
    displayMenu: false,
  };


  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true });
  }

  hideDropdownMenu = (value) => {
    console.log("clicked")
    console.log(value);
    this.setState({ displayMenu: false });

  }

  render() {
    return (
      <div className="dropdown" style={{ background: "red", width: "200px" }} >
        <div className="button" onClick={this.showDropdownMenu}> {this.state.currentOperation} </div>

        {this.state.displayMenu ? (

          <ul>
            {this.state.operations.map(operation => (
              <OperationListItem
                id={operation.id}
                key={operation.id}
                value={operation.value}
                hideDropdownMenu={() => this.hideDropdownMenu(operation.value)}
                text={operation.text}
              />
            ))}
          </ul>

        ) :
          (
            null
          )
        }

      </div>

    );
  }
}

export default Dropdown;
