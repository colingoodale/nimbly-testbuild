import React, { Component } from 'react';
import OperationListItem from "./components/operationListItem";
import operations from './operations.json';
import { bounce } from 'react-animations';
import styled, { keyframes } from "styled-components";
import './App.css';
import axios from 'axios';
const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: 2s ${bounceAnimation};
`;

class Dropdown extends Component {
  state = {
    operations: operations,
    currentOperation: "Choose Operation",
    currentValue: "simplify",
    expression: "",
    displayMenu: false,
    newtonified: "Newtonified Expression"
  };


  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true });
  }

  hideDropdownMenu = (value, text) => {
    // console.log("clicked")
    // console.log(value);
    this.setState({ currentOperation: text, currentValue: value, displayMenu: false });
  }
  // dropDownGeneralHide = (e) => {
  //   e.preventDefault();
  //   this.setState({ displayMenu: false });
  // }
  handleInputChange = event => {
    event.persist();
    // console.log(event.target)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log(this.state)
  };

  handleSubmit = () => {
    console.log('clicked')
    let operation = this.state.currentValue;
    let expression = this.state.expression;


    axios.get("https://newton.now.sh/" + operation + "/" + expression).then((data) => {
      console.log(data.data);
      this.setState({ newtonified: data.data.result });
      console.log(this.state.newtonified)
    }
    )
  }
  render() {
    return (
      //General closing clicks for page, currently overriding button click
      // onClick={(e) => this.dropDownGeneralHide(e)}
      <div className="App" >
        <h1>Newtonify</h1>
        <h3>Choose your operation from the avilable list</h3>
        <h3>Type in the equation you would like to perform</h3>
        <div className="input-owner">
          <div className="dropdown" >
            <div className="button" onClick={this.showDropdownMenu}> {this.state.currentOperation} </div>

            {this.state.displayMenu ? (

              <ul>
                {this.state.operations.map(operation => (
                  <OperationListItem
                    id={operation.id}
                    key={operation.id}
                    value={operation.value}
                    hideDropdownMenu={() => this.hideDropdownMenu(operation.value, operation.text)}
                    text={operation.text}
                  />
                ))}
              </ul>

            ) :
              (
                null
              )
            }
            <div id="input-group">
              <input
                id="expression"
                type="text"
                value={this.state.userInput}
                name="expression"
                placeholder="Expression"
                onChange={this.handleInputChange}
              />
              <button id="submit" onClick={() => this.handleSubmit()}>
                <span>Submit</span>
                <div className="success">
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="newtonified-container">
          <BouncyDiv>
            <h1 className="newtonified">
              {this.state.newtonified}
            </h1>
          </BouncyDiv>
        </div>
      </div>
    );
  }
}

export default Dropdown;
