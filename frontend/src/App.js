import React, { Component } from "react";
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitionList: []
    };
  }

  componentDidMount() {
    axios
      .get("competitions/")
      .then((results) => {
        this.setState({
          competitionList: results.data.results
        })
        console.log(competitionList)
      });

  }

  render() {
    return (
      <div className="App" >
        <h1>Competition</h1>
        <CompetitionTable competitions={this.state.competitionList} />
      </div>
    );
  }
}

export default App;
