import React from "react";
import { Badge, Button, Spinner } from "react-bootstrap"


export const selectPredictTypeOptions = {
    'classification': 'Classification',
    'binary classification': 'Binary classification',
    'multiclass classification': 'Multiclass classification',
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
    dataField: 'started_at',
    order: 'desc'
}];

export const solutionDefaultSorted = [{
    dataField: 'competition_info.ended_at',
    order: 'desc'
}, {
    dataField: 'rank',
    order: 'asc'
}];

export function listToOneLineStringWithSlash(list) {
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

export const SearchResult = (props) => {
    if (props.listSize === 0) {
        return (
            <Spinner animation="border" variant="primary" />
        );
    }
    return (
        <Badge variant="info" style={{ fontSize: "18px", margin: "10px", padding: "10px" }}>
            {props.rowCount} / {props.listSize}
        </Badge>
    );
}

export const ClearButton = (props) => {
    const handleClick = () => {
        props.onSearch('');
        props.clearAllFilter();
    };
    return (
        <Button variant="secondary" onClick={handleClick} style={{ fontSize: "16px", padding: "5px", margin: "10px", height: "40px" }}>Clear</Button>
    );
}
