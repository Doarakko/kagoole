import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";


function buttonFormatter(cell, row) {
    return <Button variant="secondary" size="sm">Edit</Button>;
}

class Competitions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionList: [],
        };
    }

    componentDidMount() {
        axios
            .get("competitions/", {
                params: {
                    category: "Research"
                }
            })
            .then((results) => {
                this.setState({
                    competitionList: results.data
                })
            });
    }

    rowEvents = {
        // onClick: (e, row, rowIndex) => {
        //     alert('ok?');
        // }
    };

    paginationOptions = {
        custom: true,
        paginationPosition: "top",
        sizePerPage: 10,
    };

    selectIsKernelOptions = {
        0: false,
        1: true,
    };

    columns = [{
        dataField: 'title',
        text: 'Title'
    }, {
        dataField: 'solution_count',
        text: 'Solution',
        sort: true

    }, {
        dataField: 'can_get_award_points',
        text: 'Award Point'
    }, {
        dataField: 'category',
        text: 'Category'
    }, {
        dataField: 'evaluation_metric',
        text: 'Evaluation Metric'
    }, {
        dataField: 'is_kernel_only',
        text: 'Kernel Only',
    }, {
        dataField: 'team_count',
        text: 'Team Count',
        sort: true
    }, {
        dataField: 'button',
        text: 'Edit',
        formatter: buttonFormatter,
    }];

    render() {
        return (
            <div className="App" >
                <h1>Competition</h1>
                <BootstrapTable
                    keyField='id'
                    data={this.state.competitionList}
                    columns={this.columns}
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    rowEvents={this.rowEvents}
                />
            </div>
        );
    }
}



export default Competitions;