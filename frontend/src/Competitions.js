import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { selectFilter, textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { ColumnToggle, Search } from 'react-bootstrap-table2-toolkit';

import SaveModalButton from './modal/SaveModalButton';
import * as TableUtil from './table-util'

const { ToggleList } = ColumnToggle;
const { SearchBar } = Search;

let titleFilter;
// let organizationFilter;
// let descriptionFilter;
let isInProgressFilter;
let canGetAwardPointsFilter;
let isKernelOnlyFilter;
// let categoryFilter;
let dataTypesFilter;
let predictTypeFilter;
let tagsFilter;
let evaluationMetricFilter;

class Competitions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionList: [],
            rowCount: 0
        };
    };

    columns = [{
        dataField: 'competition_id',
        text: '#',
        formatter: (cell, row) => (
            <img
                src={'https://storage.googleapis.com/kaggle-competitions/kaggle/' + row.competition_id + '/logos/thumb76_76.png'}
                alt='competition logo'
                height="40"
                width='40' />
        ),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'title',
        text: 'Title',
        formatter: (cell, row) => (
            <a href={row.url}> {row.title}</a>
        ),
        filter: textFilter({
            getFilter: (filter) => {
                titleFilter = filter;
            }
        }),
        headerAlign: 'center',
    }, {
        dataField: 'organization_name',
        text: 'Organization',
        filter: textFilter(),
        align: 'center',
        headerAlign: 'center',
        hidden: true,
    }, {
        dataField: 'description',
        text: 'Description',
        filter: textFilter(),
        hidden: true,
        headerAlign: 'center',
    }, {
        dataField: 'reward',
        text: 'Reward',
        formatter: (cell, row) => (
            '$' + String(row.reward).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        ),
        sort: true,
        align: 'center',
        hidden: true,
        headerAlign: 'center',
    }, {
        dataField: 'started_at',
        text: 'Start Date',
        formatter: (cell, row) => (
            row.started_at.slice(0, 10)
        ),
        hidden: true,
        sort: true,
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'ended_at',
        text: 'End Date',
        formatter: (cell, row) => (
            row.ended_at.slice(0, 10)
        ),
        sort: true,
        hidden: true,
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'is_in_progress',
        text: 'In Progress',
        formatter: cell => TableUtil.selectBooleanOptions[cell],
        filter: selectFilter({
            options: TableUtil.selectBooleanOptions,
            getFilter: (filter) => {
                isInProgressFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'team_count',
        text: 'Team Count',
        formatter: (cell, row) => (
            String(row.team_count).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        ),
        sort: true,
        align: 'center',
        hidden: true,
        headerAlign: 'center',
    }, {
        dataField: 'can_get_award_points',
        text: 'Get Medal',
        formatter: cell => TableUtil.selectBooleanOptions[cell],
        filter: selectFilter({
            options: TableUtil.selectBooleanOptions,
            defaultValue: true,
            getFilter: (filter) => {
                canGetAwardPointsFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'is_kernel_only',
        text: 'Kernel Only',
        formatter: cell => TableUtil.selectBooleanOptions[cell],
        filter: selectFilter({
            options: TableUtil.selectBooleanOptions,
            getFilter: (filter) => {
                isKernelOnlyFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'category',
        text: 'Category',
        formatter: cell => TableUtil.selectCategoryOptions[cell],
        filter: selectFilter({
            options: TableUtil.selectCategoryOptions,
        }),
        align: 'center',
        hidden: true,
        headerAlign: 'center',
    }, {
        dataField: 'data_types',
        text: 'Data Types',
        formatter: (cell, row) => (
            TableUtil.listToOneLineStringWithSlash(row.data_types)
        ),
        filter: textFilter({
            getFilter: (filter) => {
                dataTypesFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'predict_type',
        text: 'Predict Type',
        formatter: cell => TableUtil.selectPredictTypeOptions[cell],
        filter: selectFilter({
            options: TableUtil.selectPredictTypeOptions,
            getFilter: (filter) => {
                predictTypeFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'tags',
        text: 'Tags',
        formatter: (cell, row) => (
            TableUtil.listToOneLineStringWithSlash(row.tags)
        ),
        filter: textFilter({
            getFilter: (filter) => {
                tagsFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'evaluation_metric',
        text: 'Evaluation Metric',
        filter: textFilter({
            getFilter: (filter) => {
                evaluationMetricFilter = filter;
            }
        }),
        headerAlign: 'center',
    }];

    componentDidMount() {
        this.refreshCompetitionList();
    };

    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    };

    handleClearClick() {
        titleFilter('');
        // organizationFilter();
        // descriptionFilter();
        isInProgressFilter('');
        canGetAwardPointsFilter(true);
        isKernelOnlyFilter('');
        // categoryFilter();
        dataTypesFilter('');
        predictTypeFilter('');
        tagsFilter('');
        evaluationMetricFilter('');
    };

    refreshCompetitionList = () => {
        axios
            .get("competitions/")
            .then((results) => {
                this.setState({
                    competitionList: results.data
                })
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <h1>Competition Search</h1>

                <ToolkitProvider
                    bootstrap4
                    keyField='id'
                    data={this.state.competitionList}
                    columns={this.columns}
                    columnToggle
                    search
                >
                    {
                        props => (
                            <div>
                                <SearchBar {...props.searchProps} />
                                <Button
                                    variant="secondary"
                                    onClick={this.handleClearClick}
                                >
                                    Clear
                                </Button>
                                <h5>{this.state.rowCount} / {this.state.competitionList.length}</h5>
                                <SaveModalButton />
                                <hr />
                                <ToggleList {...props.columnToggleProps} />
                                <hr />
                                <BootstrapTable
                                    {...props.baseProps}
                                    pagination={paginationFactory()}
                                    filter={filterFactory()}
                                    defaultSorted={TableUtil.competitionDefaultSorted}
                                    onDataSizeChange={this.handleDataChange}
                                    noDataIndication="Table is Empty"
                                    striped
                                    hover
                                    condensed
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div >
        );
    }
}

export default Competitions;



