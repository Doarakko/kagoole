import React from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { selectFilter, textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { ColumnToggle, Search } from 'react-bootstrap-table2-toolkit';

import * as TableUtil from './table-util';
import * as Url from "./url";


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
            rowCount: 0,
        };
    };

    columns = [{
        dataField: 'kaggle_competition_id',
        text: '#',
        formatter: (cell, row) => (
            <img
                src={'https://storage.googleapis.com/kaggle-competitions/kaggle/' + row.kaggle_competition_id + '/logos/thumb76_76.png'}
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
            <a href={row.url}>{row.title}</a>
        ),
        filter: textFilter({
            getFilter: (filter) => {
                titleFilter = filter;
            }
        }),
        headerAlign: 'center',
    }, {
        dataField: 'solution_count',
        text: 'Solution',
        formatter: (cell, row) => (
            this.solutionCountFormatter(row)
        ),
        sort: true,
        align: 'center',
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

    solutionCountFormatter(row) {
        if (row.solution_count === 0) {
            return 0;
        }
        return <a href={Url.base + '/solutions?title=' + row.title}> {row.solution_count}</a>
    }

    clearAllFilter() {
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
            .get(Url.api + "/competitions/")
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
                    keyField='kaggle_competition_id'
                    data={this.state.competitionList}
                    columns={this.columns}
                    columnToggle
                    search
                >
                    {
                        props => (
                            <div>
                                <div style={{ textAlign: "center", verticalAlign: "middle" }} >
                                    <SearchBar {...props.searchProps} style={{ width: "400px", height: "40px" }} />
                                    <TableUtil.ClearButton
                                        {...props.searchProps}
                                        clearAllFilter={this.clearAllFilter}
                                    />
                                    <TableUtil.SearchResult rowCount={this.state.rowCount} listSize={this.state.competitionList.length} />
                                </div>
                                <div style={{ width: "100%", padding: "10px" }} >
                                    <div style={{ paddingBottom: "10px" }} >
                                        <ToggleList {...props.columnToggleProps} />
                                    </div>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        pagination={paginationFactory()}
                                        filter={filterFactory()}
                                        defaultSorted={TableUtil.competitionDefaultSorted}
                                        onDataSizeChange={this.handleDataChange}
                                        noDataIndication="There is no competition"
                                        striped
                                        hover
                                        condensed
                                    />
                                </div>
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div >
        );
    }
}

export default Competitions;



