import React from "react";
import axios from "axios";
import Select from 'react-select';


class CompetitionBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: null,
            competitionList: [],
        };
    }

    componentDidMount() {
        axios
            .get("competitions/")
            .then((results) => {
                this.setState({
                    competitionList: results.data
                })
            });
    };

    handleChange = competition => {
        this.setState({ competition });
    };

    render() {
        return (
            <Select
                name="id"
                value={this.state.competition}
                onChange={this.handleChange}
                options={this.state.competitionList}
                getOptionLabel={option => option['title']}
                getOptionValue={option => option['id']}
                placeholder='titanic'
                className="basic-single"
            />
        )
    }
}

export default CompetitionBox;