import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Select from 'react-select';


class SaveModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionList: [],

            competition: null,
            rank: null,
            solutionUrl: null,
            medal: 'Gold',
            includeCode: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        axios
            .get("competitions/")
            .then((results) => {
                this.setState({
                    competitionList: results.data
                })
            })
            .catch(err => console.log(err));
    };

    async handleSubmit(event) {
        axios
            .post("solutions/", {
                competition: this.state.competition.id,
                rank: this.state.rank,
                url: this.state.solutionUrl,
                medal: this.state.medal,
                include_code: this.state.includeCode,
            }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            .catch(err => console.log(err));
    };

    handleCompetitionChange = competition => {
        this.setState({ competition });
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    };

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
                    <Form
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group>
                            <Form.Label>Competition</Form.Label>
                            <Select
                                name="id"
                                value={this.state.id}
                                onChange={this.handleCompetitionChange}
                                options={this.state.competitionList}
                                getOptionLabel={option => option['title'] + ': ' + option['ended_at'].slice(0, 10)}
                                getOptionValue={option => option['id']}
                                noOptionsMessage={() => 'No competition'}
                                placeholder='Enter competition name'
                                className="basic-single"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Rank</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Private Leaderboard Rank"
                                name='rank'
                                onChange={this.handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Solution URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="https://www.abcd.com/xyz"
                                name='solutionUrl'
                                onChange={this.handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Medal</Form.Label>
                            <Form.Control as="select" name='medal' onChange={this.handleChange} >
                                <option>Gold</option>
                                <option>Silver</option>
                                <option>Bronze</option>
                                <option>Nothing</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Include Code</Form.Label>
                            <Form.Check type="checkbox" name='includeCode' onChange={this.handleChange} />
                        </Form.Group>
                        <Modal.Footer>
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={this.props.onHide}
                                disabled={!(this.state.competition && this.state.rank && this.state.solutionUrl && this.state.medal)}
                            >
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal >
        );
    }
}

export default SaveModal;