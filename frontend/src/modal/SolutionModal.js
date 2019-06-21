import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

import CompetitionBox from "./CompetitionBox"


class SolutionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionList: [],
        };
    }

    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`solutions/${item.id}/`, item)
                .then(res => this.refreshList());
            return;
        }
        axios
            .post("Solutions/", item)
            .then(res => this.refreshList());
    };
    handleDelete = item => {
        axios
            .delete(`solutions/${item.id}`)
            .then(res => this.refreshList());
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
                    <Form>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Competition</Form.Label>
                            <CompetitionBox />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Rank</Form.Label>
                            <Form.Control type="number" min="1" placeholder="Private leaderboard rank" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Solution URL</Form.Label>
                            <Form.Control type="url" placeholder="https://www.abcde.com/solution" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Medal</Form.Label>
                            <Form.Control as="select">
                                <option>Gold</option>
                                <option>Silver</option>
                                <option>Bronze</option>
                                <option>Nothing</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="formGridCheckbox">
                            <Form.Label>Contains code</Form.Label>
                            <Form.Check type="checkbox" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Save</Button>
                    <Button variant="danger">Delete</Button>
                    {/* <Button onClick={this.props.onHide}>Close</Button> */}
                </Modal.Footer>
            </Modal >
        );
    }
}

export default SolutionModal;


