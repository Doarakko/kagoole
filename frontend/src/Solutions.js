import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";


function buttonFormatter(cell, row) {
    return <Button variant="secondary" size="sm">Edit</Button>;
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
        dataField: 'url',
        text: 'URL'
    }, {
        dataField: 'competition_info.title',
        text: 'Title'
    }, {
        dataField: 'competition_info.can_get_award_points',
        text: 'Award Point'
    }, {
        dataField: 'competition_info.category',
        text: 'Category'
    }, {
        dataField: 'competition_info.evaluation_metric',
        text: 'Evaluation Metric'
    }, {
        dataField: 'competition_info.is_kernel_only',
        text: 'Kernel Only',
    }, {
        dataField: 'competition_info.team_count',
        text: 'Team Count',
        sort: true
    }, {
        dataField: 'button',
        isDummyField: true,
        text: 'Edit',
        formatter: buttonFormatter,
    }];

    render() {
        return (
            <div className="App" >
                <h1>Solutions</h1>
                <BootstrapTable
                    keyField='id'
                    data={this.state.solutionList}
                    columns={this.columns}
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    rowEvents={this.rowEvents}
                />
            </div>
        );
    }
}


export default Solutions;