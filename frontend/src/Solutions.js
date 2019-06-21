import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap"


class SolutionRow extends React.Component {
    render() {
        const solution = this.props.solution;

        return (
            <tr>
                <td>{solution.url}</td>
                <td>{solution.competition.title}</td>
                <td>{solution.competition.data_types}</td>
                <td>{solution.medal}</td>
                <td><a href={solution.url} target="_blank" rel="noopener noreferrer">Solution</a></td>
            </tr >
        );
    }
}

class SolutionTable extends React.Component {
    render() {
        const rows = [];

        this.props.solutions.forEach((solution) => {
            rows.push(
                <SolutionRow
                    solution={solution}
                    key={solution.url} />
            );
        });
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Competition</th>
                        <th>Data Types</th>
                        <th>Evaluation Metric</th>
                        <th>Kernel Only</th>
                        <th>Rank</th>
                        <th>Medal</th>
                        <th>Top(%)</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}

class Solutions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solutionList: []
        };
    }

    componentDidMount() {
        axios
            .get("solutions/")
            .then((results) => {
                this.setState({
                    solutionList: results.data
                })
            });

    }

    render() {
        return (
            <div>
                <h1>Solution</h1>
                <SolutionTable solutions={this.state.solutionList} />
            </div>
        );
    }
}


export default Solutions;