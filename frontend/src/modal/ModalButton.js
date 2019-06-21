import React from "react";
import SolutionModal from "./SolutionModal";

import { Button, ButtonToolbar } from "react-bootstrap"


class ModalButton extends React.Component {
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
                    variant="primary"
                    onClick={() => this.setState({ modalShow: true })}
                >
                    Add
                </Button>

                <SolutionModal
                    modalShow={this.state.modalShow}
                    onHide={modalClose}
                />
            </ButtonToolbar>
        );
    }
}

export default ModalButton;
