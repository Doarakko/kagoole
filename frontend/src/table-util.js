import React from "react";
import { Button } from "react-bootstrap"
import { selectFilter, textFilter } from "react-bootstrap-table2-filter";

export const paginationOptions = {
    custom: true,
    paginationPosition: "top",
    sizePerPage: 8,
};

export const selectPredictTypeOptions = {
    'binary classification': 'Binary Classification',
    'multiclass classification': 'Multiclass Classification',
    'regression': 'Regression',
};

export const selectCategoryOptions = {
    'Analytics': 'Analytics',
    'Featured': 'Featured',
    'Getting Started': 'Getting Started',
    'Masters': 'Masters',
    'Playground': 'Playground',
    'Recruitment': 'Recruitment',
    'Research': 'Research',
};

export const selectMedalOptions = {
    'Gold': 'Gold',
    'Silver': 'Silver',
    'Bronze': 'Bronze',
    'Nothing': 'Nothing',
};

export const selectBooleanOptions = {
    false: 'No',
    true: 'Yes',
};

export const competitionDefaultSorted = [{
    dataField: 'ended_at',
    order: 'desc'
}];

export const solutionDefaultSorted = [{
    dataField: 'rank',
    order: 'asc'
}, {
    dataField: 'competition_info.ended_at',
    order: 'desc'
}];

export const competitionColumns = [{
    dataField: 'competition_id',
    text: '#',
    formatter: (cell, row) => (
        <img
            src={'https://storage.googleapis.com/kaggle-competitions/kaggle/' + row.competition_id + '/logos/thumb76_76.png'}
            alt='competition logo'
            height="40"
            width='40' />
    ),
    headerAlign: 'center',
}, {
    dataField: 'title',
    text: 'Title',
    formatter: (cell, row) => (
        <a href={row.url}> {row.title}</a>
    ),
    filter: textFilter(),
    headerAlign: 'center',
}, {
    dataField: 'organization_name',
    text: 'Organization',
    filter: textFilter(),
    align: 'center',
    hidden: true,
    headerAlign: 'center',
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
    formatter: cell => selectBooleanOptions[cell],
    filter: selectFilter({
        options: selectBooleanOptions,
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
},
//  {
//     dataField: 'solution_count',
//     text: 'Solution',
//     filter: numberFilter({
//         defaultValue: { number: 0, comparator: Comparator.EQ }
//     }),
//     sort: true,
//     align: 'center',

// }, 
{
    dataField: 'can_get_award_points',
    text: 'Get Medal',
    formatter: cell => selectBooleanOptions[cell],
    filter: selectFilter({
        options: selectBooleanOptions,
        defaultValue: true
    }),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'is_kernel_only',
    text: 'Kernel Only',
    formatter: cell => selectBooleanOptions[cell],
    filter: selectFilter({
        options: selectBooleanOptions,
    }),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'category',
    text: 'Category',
    formatter: cell => selectCategoryOptions[cell],
    filter: selectFilter({
        options: selectCategoryOptions,
    }),
    align: 'center',
    hidden: true,
    headerAlign: 'center',
}, {
    dataField: 'data_types',
    text: 'Data Types',
    formatter: (cell, row) => (
        listToOneLineStringWithSlash(row.data_types)
    ),
    filter: textFilter(),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'predict_type',
    text: 'Predict Type',
    formatter: cell => selectPredictTypeOptions[cell],
    filter: selectFilter({
        options: selectPredictTypeOptions,
    }),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'tags',
    text: 'Tags',
    formatter: (cell, row) => (
        listToOneLineStringWithSlash(row.tags)
    ),
    filter: textFilter(),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'evaluation_metric',
    text: 'Evaluation Metric',
    filter: textFilter(),
    headerAlign: 'center',
}];

export const solutionColumns = [{
    dataField: 'competition_info.competition_id',
    text: '#',
    formatter: (cell, row) => (
        <img
            src={'https://storage.googleapis.com/kaggle-competitions/kaggle/' + row.competition_info.competition_id + '/logos/thumb76_76.png'}
            alt='competition logo'
            height="40"
            width='40' />
    ),
    hidden: false,
    headerAlign: 'center',
}, {
    dataField: 'competition_info.Title',
    text: 'Title',
    formatter: (cell, row) => (
        <a href={row.competition_info.url}> {row.competition_info.title}</a>
    ),
    filter: textFilter(),
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
        options: selectMedalOptions,
        defaultValue: true
    }),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'include_code',
    text: 'Include Code',
    formatter: cell => selectBooleanOptions[cell],
    filter: selectFilter({
        options: selectBooleanOptions,
    }),
    align: 'center',
    headerAlign: 'center',
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
    filter: textFilter(),
    align: 'center',
    hidden: true,
    headerAlign: 'center',
}, {
    dataField: 'competition_info.description',
    text: 'Description',
    filter: textFilter(),
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
    hidden: true,
    sort: true,
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'competition_info.ended_at',
    text: 'End Date',
    formatter: (cell, row) => (
        row.competition_info.ended_at.slice(0, 10)
    ),
    sort: true,
    hidden: true,
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'competition_info.team_count',
    text: 'Team Count',
    formatter: (cell, row) => (
        String(row.competition_info.team_count).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    ),
    sort: true,
    align: 'center',
    hidden: true,
    headerAlign: 'center',
}, {
    dataField: 'competition_info.can_get_award_points',
    text: 'Get Medal',
    formatter: cell => selectBooleanOptions[cell],
    filter: selectFilter({
        options: selectBooleanOptions,
    }),
    align: 'center',
    hidden: true,
    headerAlign: 'center',
}, {
    dataField: 'competition_info.is_kernel_only',
    text: 'Kernel Only',
    formatter: cell => selectBooleanOptions[cell],
    filter: selectFilter({
        options: selectBooleanOptions,
    }),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'competition_info.category',
    text: 'Category',
    formatter: cell => selectCategoryOptions[cell],
    filter: selectFilter({
        options: selectCategoryOptions,
    }),
    align: 'center',
    headerAlign: 'center',
    hidden: true,
}, {
    dataField: 'competition_info.data_types',
    text: 'Data Types',
    formatter: (cell, row) => (
        listToOneLineStringWithSlash(row.competition_info.data_types)
    ),
    filter: textFilter(),
    headerAlign: 'center',
    hidden: false,
}, {
    dataField: 'competition_info.predict_type',
    text: 'Predict Type',
    formatter: cell => selectPredictTypeOptions[cell],
    filter: selectFilter({
        options: selectPredictTypeOptions,
    }),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'competition_info.tags',
    text: 'Tags',
    formatter: (cell, row) => (
        listToOneLineStringWithSlash(row.competition_info.tags)
    ),
    filter: textFilter(),
    align: 'center',
    headerAlign: 'center',
}, {
    dataField: 'competition_info.evaluation_metric',
    text: 'Evaluation Metric',
    filter: textFilter(),
    headerAlign: 'center',
}, {
    isDummyField: true,
    text: 'Operation',
    formatter: () => (
        <div>
            <Button variant="secondary" size="sm">Edit</Button>
            <Button variant="danger" size="sm">Delete</Button>
        </div>
    ),
    align: 'center',
    headerAlign: 'center',
    hidden: true,
}];

function listToOneLineStringWithSlash(list) {
    var s = '';
    for (let i = 0; i < list.length; i++) {
        if (i !== list.length - 1) {
            s += list[i] + ', ';
        } else {
            s += list[i];
        }
    }
    return s;
}
