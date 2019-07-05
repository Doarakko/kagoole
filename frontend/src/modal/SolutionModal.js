import React from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

import CompetitionBox from "./CompetitionBox"


class SolutionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            rank: 1,
            solutionUrl: '',
            medal: '',
            includeCode: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        axios
            .post("solutions/", {
                rank: this.state.rank,
                url: this.state.solutionUrl,
                medal: this.state.medal,
                include_code: this.state.includeCode,
                competition: this.state.competitionId,
            }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        event.preventDefault();
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
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Competition</Form.Label>
                            <CompetitionBox />
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
                        <Button type="submit" variant="primary">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal >
        );
    }
}

export default SolutionModal;