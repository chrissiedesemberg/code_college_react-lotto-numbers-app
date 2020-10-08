import React, { Component } from "react";
import axios from "axios"; // npm install axios
import ReactLoading from "react-loading";
import { Media, NavLink, Button } from "react-bootstrap";

class NumberGame extends Component {
  constructor() {
    super();
    this.state = {
      playInAction: false,
      numbers: [],
      selectedNumber: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      selectedNumber: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      playInAction: true,
    });
    this.playGame();
  }

  playGame() {
    axios
      .get(
        "http://cors-anywhere.herokuapp.com/http://www.randomnumberapi.com/api/v1.0/random?min=1" +
          "&max=10&count=1"
      )
      .then((res) => {
        this.setState({
          playInAction: false,
          numbers: res.data,
        });
        console.log(res.data);
      });
  }
  render() {
    let randomNumber = this.state.numbers;
    console.log(randomNumber);
    let selectedNumber = this.state.selectedNumber;
    console.log(selectedNumber);
    let winner = randomNumber === selectedNumber;
    let loser = randomNumber !== selectedNumber;

    return (
      <div>
        <hr />
        <section className="section">
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="number"
              className="input addInput"
              placeholder="Enter Starting number here"
              onChange={this.handleChange}
            />
            <button className="button is-info ">Play!</button>
          </form>
        </section>
        <hr></hr>
        {this.state.playInAction && (
          <ReactLoading type="spinningBubbles" color="#444" />
        )}

        {winner && (
          <Media>
            <Media.Body>
              <h1>Congratulations!</h1>
              <h2>You have won!</h2>
            </Media.Body>
            <Media.Body>
              <Button className="button is-info ">Play again!</Button>
            </Media.Body>
          </Media>
        )}

        {loser && this.state.playInAction === false && (
          <Media>
            <Media.Body>
              <h1>Sorry!</h1>
              <h2>You have lost!</h2>
            </Media.Body>
            <Media.Body>
              <Button className="button is-info ">Try again!</Button>
            </Media.Body>
          </Media>
        )}
      </div>
    );
  }
}
export default NumberGame;
