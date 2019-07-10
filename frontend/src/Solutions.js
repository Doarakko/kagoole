import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { selectFilter, textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { ColumnToggle, Search } from 'react-bootstrap-table2-toolkit';

import SaveModalButton from './modal/SaveModalButton';
import DeleteModalButton from './modal/DeleteModalButton';
import * as TableUtil from './table-util'

const { ToggleList } = ColumnToggle;
const { SearchBar } = Search;

let titleFilter;
let medalFilter;
// let includeCodeFilter;
// let organizationFilter;
// let descriptionFilter;
// let canGetAwardPointsFilter;
let isKernelOnlyFilter;
// let categoryFilter;
let dataTypesFilter;
let predictTypeFilter;
let tagsFilter;
let evaluationMetricFilter;


class Solutions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solutionList: [],
            rowCount: 0,
        };
    };

    columns = [{
        dataField: 'competition_info.competition_id',
        text: '#',
        formatter: (cell, row) => (
            <img
                src={'https://storage.googleapis.com/kaggle-competitions/kaggle/' + row.competition_info.competition_id + '/logos/thumb76_76.png'}
                alt='competition logo'
                height="40"
                width='40' />
        ),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'competition_info.Title',
        text: 'Title',
        formatter: (cell, row) => (
            <a href={row.competition_info.url}> {row.competition_info.title}</a>
        ),
        filter: textFilter({
            getFilter: (filter) => {
                titleFilter = filter;
            }
        }),
        headerAlign: 'center',
    }, {
        dataField: 'rank',
        text: 'Rank',
        sort: true,
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'medal',
        text: 'Medal',
        filter: selectFilter({
            options: TableUtil.selectMedalOptions,
            defaultValue: true,
            getFilter: (filter) => {
                medalFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'include_code',
        text: 'Include Code',
        formatter: cell => TableUtil.selectBooleanOptions[cell],
        filter: selectFilter({
            // getFilter: (filter) => {
            //     includeCodeFilter = filter;
            // },
            options: TableUtil.selectBooleanOptions,
        }),
        align: 'center',
        headerAlign: 'center',
        hidden: true,
    }, {
        dataField: 'url',
        text: 'URL',
        formatter: (cell, row) => (
            <a href={row.url}>Solution</a>
        ),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'competition_info.organization_name',
        text: 'Organization',
        filter: textFilter({
            // getFilter: (filter) => {
            //     organizationFilter = filter;
            // }
        }),
        align: 'center',
        hidden: true,
        headerAlign: 'center',
    }, {
        dataField: 'competition_info.description',
        text: 'Description',
        filter: textFilter({
            // getFilter: (filter) => {
            //     descriptionFilter = filter;
            // }
        }),
        hidden: true,
        headerAlign: 'center',
    }, {
        dataField: 'competition_info.reward',
        text: 'Reward',
        formatter: (cell, row) => (
            '$' + String(row.competition_info.reward).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        ),
        sort: true,
        align: 'center',
        hidden: true,
        headerAlign: 'center',
    }, {
        dataField: 'competition_info.started_at',
        text: 'Start Date',
        formatter: (cell, row) => (
            row.competition_info.started_at.slice(0, 10)
        ),
        sort: true,
        align: 'center',
        headerAlign: 'center',
        hidden: true,
    }, {
        dataField: 'competition_info.ended_at',
        text: 'End Date',
        formatter: (cell, row) => (
            row.competition_info.ended_at.slice(0, 10)
        ),
        sort: true,
        align: 'center',
        headerAlign: 'center',
        hidden: true,
    }, {
        dataField: 'competition_info.team_count',
        text: 'Team Count',
        formatter: (cell, row) => (
            String(row.competition_info.team_count).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        ),
        sort: true,
        align: 'center',
        headerAlign: 'center',
        hidden: true,
    }, {
        dataField: 'competition_info.can_get_award_points',
        text: 'Get Medal',
        formatter: cell => TableUtil.selectBooleanOptions[cell],
        filter: selectFilter({
            options: TableUtil.selectBooleanOptions,
            // getFilter: (filter) => {
            //     canGetAwardPointsFilter = filter;
            // }
        }),
        align: 'center',
        headerAlign: 'center',
        hidden: true,
    }, {
        dataField: 'competition_info.is_kernel_only',
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
        dataField: 'competition_info.category',
        text: 'Category',
        formatter: cell => TableUtil.selectCategoryOptions[cell],
        filter: selectFilter({
            options: TableUtil.selectCategoryOptions,
            // getFilter: (filter) => {
            //     categoryFilter = filter;
            // }
        }),
        align: 'center',
        headerAlign: 'center',
        hidden: true,
    }, {
        dataField: 'competition_info.data_types',
        text: 'Data Types',
        formatter: (cell, row) => (
            TableUtil.listToOneLineStringWithSlash(row.competition_info.data_types)
        ),
        filter: textFilter({
            getFilter: (filter) => {
                dataTypesFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
        hidden: false,
    }, {
        dataField: 'competition_info.predict_type',
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
        dataField: 'competition_info.tags',
        text: 'Tags',
        formatter: (cell, row) => (
            TableUtil.listToOneLineStringWithSlash(row.competition_info.tags)
        ),
        filter: textFilter({
            getFilter: (filter) => {
                tagsFilter = filter;
            }
        }),
        align: 'center',
        headerAlign: 'center',
    }, {
        dataField: 'competition_info.evaluation_metric',
        text: 'Evaluation Metric',
        filter: textFilter({
            getFilter: (filter) => {
                evaluationMetricFilter = filter;
            }
        }),
        headerAlign: 'center',
    }, {
        isDummyField: true,
        dataField: 'action',
        text: 'Action',
        formatter: (cell, row) => (
            <div>
                <DeleteModalButton solution={row} />
            </div>
        ),
        align: 'center',
        headerAlign: 'center',
        hidden: true,
    }];

    componentDidMount() {
        this.refreshSolutionList();
    };

    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    };

    handleClearClick() {
        titleFilter('');
        medalFilter('');
        // includeCodeFilter();
        // organizationFilter();
        // descriptionFilter();
        // canGetAwardPointsFilter();
        isKernelOnlyFilter('');
        // categoryFilter();
        dataTypesFilter('');
        predictTypeFilter('');
        tagsFilter('');
        evaluationMetricFilter('');
    };

    refreshSolutionList = () => {
        axios
            .get("solutions/")
            .then((results) => {
                this.setState({
                    solutionList: results.data,
                })
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <h1>Solution Search</h1>

                <ToolkitProvider
                    bootstrap4
                    keyField='id'
                    data={this.state.solutionList}
                    columns={this.columns}
                    columnToggle
                    search
                >{
                        props => (
                            <div>
                                <SearchBar {...props.searchProps} />
                                <Button
                                    variant="secondary"
                                    onClick={this.handleClearClick}
                                >
                                    Clear
                                </Button>
                                <h5>{this.state.rowCount} / {this.state.solutionList.length}</h5>
                                <SaveModalButton />
                                <hr />
                                <ToggleList {...props.columnToggleProps} />
                                <BootstrapTable
                                    {...props.baseProps}
                                    pagination={paginationFactory()}
                                    filter={filterFactory()}
                                    onDataSizeChange={this.handleDataChange}
                                    defaultSorted={TableUtil.solutionDefaultSorted}
                                    noDataIndication="Table is Empty"
                                    striped
                                    hover
                                    condensed
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}


export default Solutions;