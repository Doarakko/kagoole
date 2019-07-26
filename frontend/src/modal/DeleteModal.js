import React from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

import * as Url from "../url";


class DeleteModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        axios
            .delete(Url.api + "/solutions/" + this.props.solution.id + '/')
            .then((results) => {
                console.log(results)
            })
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
                        <img
                            src={'https://storage.googleapis.com/kaggle-competitions/kaggle/' + this.props.solution.competition_info.kaggle_competition_id + '/logos/thumb76_76.png'}
                            alt='competition logo'
                            height="40"
                            width='40' />
                        {this.props.solution.competition_info.title}
                        <h5>End Date</h5>
                        {this.props.solution.competition_info.ended_at.slice(0, 10)}
                        <h5>Rank</h5>
                        {this.props.solution.rank}
                        <h5>Medal</h5>
                        {this.props.solution.medal}
                        <h5>Solution URL</h5>
                        {this.props.solution.url}
                        <br />
                        <br />
                        If you delete by mistake, please contact from <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZlhz5UK92LLY126uBaKXIl8AstQpaxlPhWcC8aHO2SE5FeQ/viewform?usp=sf_link">here</a>.
                        <Modal.Footer>
                            <Button
                                type="submit"
                                variant="danger"
                                onClick={this.props.onHide}>
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