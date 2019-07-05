import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap"

import SolutionModal from "./SolutionModal";


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
