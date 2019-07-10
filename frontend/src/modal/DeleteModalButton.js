import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap"

import DeleteModal from "./DeleteModal";


class DeleteModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        };
    }
    render() {
        let modalClose = () => {
            this.setState({ modalShow: false });
        }

        return (
            <ButtonToolbar>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => this.setState({ modalShow: true })}
                >
                    Delete
                </Button>

                <DeleteModal
                    modalShow={this.state.modalShow}
                    onHide={modalClose}
                    solution={this.props.solution}
                />
            </ButtonToolbar>
        );
    }
}

export default DeleteModalButton;
