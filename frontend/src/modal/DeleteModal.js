import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";


class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        axios
            .delete("solutions/" + this.props.solution.id, {
            }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            .catch(err => console.log(err));
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
                        Delete Solution
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <h5>Competition</h5>
                        {this.props.solution.competition_info.title}
                        <h5>Rank</h5>
                        {this.props.solution.competition_info.title}

                        If you delete by mistake, please contact from here.
                        <Modal.Footer>
                            <Button type="submit" variant="danger" onClick={this.props.onHide}>
                                Delete
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal >
        );
    }
}

export default DeleteModal;