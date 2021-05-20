import React, { Component } from "react";
import axios from "axios"; // npm install axios
import ReactLoading from "react-loading";

class RandomNumber extends Component {
  constructor() {
    super();
    this.state = {
      endingNumber: 0,
      numbersToSupply: 0,
      isLoading: false,
      numbers: [],
    };
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.getLottoNumbers(this.state.endingNumber, this.state.numbersToSupply);
  }

  handleChangeOne(e) {
    this.setState({
      endingNumber: e.target.value,
    });
  }

  handleChangeTwo(e) {
    this.setState({
      numbersToSupply: e.target.value,
    });
  }

  getLottoNumbers(endingNumber, numbersToSupply) {
    axios
      .get(
          "http://cors-anywhere.herokuapp.com/http://www.randomnumberapi.com/api/v1.0/random?min=1&max=" +
          endingNumber +
          "&count=" +
          numbersToSupply
      )
      .then((res) => {
        this.setState({
          isLoading: false,
          numbers: res.data,
        });

        console.log(res.data);
      });
  }
  render() {
    const numbersChosen = this.state.numbers.map((number) => (
      <span style={number.list}>{number && <span>{number}</span>} </span>
    ));

    return (
      <div style={layout.all}>
        <br/>
        <p style={{color: "red"}}>In order for this demo to work, you will need to enable your browser to use CORS - visit http://cors-anywhere.herokuapp.com/ and click on button to give temporary access</p>

        <section className="section">
          <h1 style={layout.form}>Lotto/Powerball number generator</h1>
          <hr></hr>
          <p>The starting number is 1</p>
          <p>Enter the highest number of the game you are playing</p>
          <p>Enter the maximum # of numbers you require</p>
          <hr />
          <form className="form" onSubmit={this.handleSubmit}>
            <div style={layout.formGroup}>
              <label style={layout.label}>
                Enter the highest value of the numbers:{" "}
              </label>
              <input
                style={layout.input}
                type="number"
                className="input addInput"
                placeholder="Enter Ending number here"
                onChange={this.handleChangeOne}
              />
            </div>
            <div style={layout.formGroup}>
              <label style={layout.label}>
                Enter the maximum amount of numbers:{" "}
              </label>
              <input
                style={layout.input}
                type="number"
                className="input addInput"
                placeholder="Enter amount of numbers needed"
                onChange={this.handleChangeTwo}
              />
            </div>
            <div style={layout.formGroup}>
              <button style={layout.button} className="button is-info ">
                Get my numbers!
              </button>
            </div>
          </form>
        </section>

        {/*{this.state.isLoading && (*/}
        {/*  <ReactLoading*/}
        {/*    style={number.display}*/}
        {/*    type="spinningBubbles"*/}
        {/*    color="#444"*/}
        {/*  />*/}
        {/*)}*/}
        <div style={number.display}>
          <div>↓</div>
          {numbersChosen}
          <div>↑</div>
        </div>
      </div>
    );
  }
}
export default RandomNumber;

const layout = {
  all: {
    backgroundColor: "black",
    margin: "0",
    color: "white",
    height: "100vh",
  },
  form: {
    fontSize: "2em",
    color: "yellow",
  },
  label: {
    fontSize: "1em",
    textAlign: "left",
  },
  input: {
    fontSize: "1em",
    margin: "1em",
    width: "18em",
  },
  button: {
    display: "block",
    fontSize: "1em",
    margin: "1em auto",
    width: "18em",
    backgroundColor: "black",
    border: "1px solid yellow",
    color: "yellow",
    fontWeight: "bolder",
    padding: "1em",
  },
  formItems: {
    fontSize: "1em",
    margin: "2em auto",
    width: "10em",
    display: "inline-block",
  },
  formGroup: {
    width: "30em",
    display: "block",
    margin: "0 auto",
    padding: "2em 3em 1em",
  },
};

const number = {
  list: {
    display: "inline",
    marginRight: "3px",
  },
  display: {
    fontSize: "3em",
    paddingRight: "1em",
    color: "yellow",
  },
};
