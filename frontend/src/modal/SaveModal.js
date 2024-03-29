import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { withFormik, ErrorMessage as FormikErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import Select from 'react-select';

import * as Url from "../url";


const MAX_VALUE_RANK = 2147483647;

const ErrorMessage = props => {
    return (
        <div style={{ color: "red", marginTop: ".5rem" }} >
            <FormikErrorMessage name={props.name} />
        </div>
    )
}

const SolutionSaveForm = props => {
    const {
        values,
        touched,
        errors,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting
    } = props;

    return (
        <Form
            onSubmit={handleSubmit}
        >
            <CompetitionSelect
                value={values.competition}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.competition}
                touched={touched.competition}
            />
            <Form.Group>
                <Form.Label>Rank</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Private Leaderboard Rank"
                    name='rank'
                    id='rank'
                    value={values.rank}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.isNoRank ? "disabled" : ""}
                />
                <ErrorMessage name="rank" />
                <Form.Label>No rank</Form.Label>
                <Form.Check
                    type="checkbox"
                    name='isNoRank'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.isNoRank}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Solution URL</Form.Label>
                <Form.Control
                    type="url"
                    placeholder="https://www.abc.com/xyz"
                    name='solutionUrl'
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <ErrorMessage name="solutionUrl" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Medal</Form.Label>
                <Form.Control
                    as="select"
                    name='medal'
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.medal}
                >
                    <option>Gold</option>
                    <option>Silver</option>
                    <option>Bronze</option>
                    <option>Nothing</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Include Code</Form.Label>
                <Form.Check
                    type="checkbox"
                    name='includeCode'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.includeCode}
                />
            </Form.Group>
            <Modal.Footer>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    onClick={isValid ? props.onHide : undefined}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Form >
    );
};

const EnhancedForm = withFormik({
    validationSchema: yup.object().shape({
        competition: yup.object()
            .required("Competition is required"),
        rank: yup.number()
            .when('isNoRank', {
                is: false,
                then: yup
                    .number()
                    .positive("Rank must be a positive number")
                    .integer("Rank must be a integer")
                    .required("Rank is required"),
            }),
        isNoRank: yup.boolean(),
        solutionUrl: yup.string()
            .url("Solution URL must be a valid URL")
            .required("Solution URL is required")
    }),
    validate: values => {
        let errors = {};
        let now = new Date().toISOString();

        if (values.competition.ended_at > now) {
            errors.competition = "This competition is in progress";
        }

        if (values.rank > values.competition.team_count) {
            errors.rank = "Team count is " + values.competition.team_count;
        }

        return errors;
    },

    mapPropsToValues: props => ({
        competition: "",
        rank: "",
        isNoRank: false,
        solutionUrl: "",
        medal: "Gold",
        includeCode: false,
    }),

    handleSubmit: (values) => {
        let result;
        axios
            .get(Url.api + "/solutions/", {
                params: {
                    url: values.solutionUrl,
                },
            })
            .then((results) => {
                result = results.data;
                console.log(result);
                if (result.length >= 1) {
                    alert(
                        "This solution is already registered.\n\n"
                        + "Competition: " + result[0].competition_info.title + "\n"
                        + "Rank: " + result[0].rank + "\n"
                    );
                } else {
                    if (values.isNoRank) {
                        values.rank = MAX_VALUE_RANK;
                        values.medal = "Nothing";
                    }

                    axios
                        .post(Url.api + "/solutions/", {
                            competition: values.competition.ref,
                            rank: values.rank,
                            url: values.solutionUrl,
                            medal: values.medal,
                            include_code: values.includeCode,
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }
                        )
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    },
})(SolutionSaveForm);

const formatOptionLabel = ({ title, started_at, ended_at }) => (
    <div style={{ display: "flex" }}>
        <div>{title}</div>
        <div style={{ marginLeft: "10px", color: "#999" }}>
            {started_at.slice(0, 10)} ~ {ended_at.slice(0, 10)}
        </div>
    </div>
);

class CompetitionSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionList: [],
        };
    };

    componentDidMount() {
        axios
            .get(Url.api + "/competitions/")
            .then((results) => {
                this.setState({
                    competitionList: results.data
                })
            })
            .catch(err => console.log(err));
    };

    handleChange = value => {
        this.props.onChange("competition", value);
    };

    handleBlur = () => {
        this.props.onBlur("competition", true);
    };

    render() {
        return (
            <Form.Group>
                <Form.Label>Competition</Form.Label>
                <Select
                    id='competition'
                    name="competition"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    options={this.state.competitionList}
                    getOptionLabel={option => option['title']}
                    formatOptionLabel={formatOptionLabel}
                    getOptionValue={option => option['ref']}
                    noOptionsMessage={() => 'No competition'}
                    placeholder='Enter competition name'
                    className="basic-single"
                />
                <ErrorMessage name="competition" />
            </Form.Group>
        );
    }
}


class SaveModal extends React.Component {
    render() {
        return (
            <Modal
                onHide={this.props.onHide}
                show={this.props.modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Solution
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EnhancedForm onHide={this.props.onHide} />
                </Modal.Body>
            </Modal >
        );
    }
}

export default SaveModal;
