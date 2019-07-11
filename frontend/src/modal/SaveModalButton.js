import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap"

import SaveModal from "./SaveModal";


class SaveModalButton extends React.Component {
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
                    {this.props.buttonText}
                </Button>

                <SaveModal
                    modalShow={this.state.modalShow}
                    onHide={modalClose}
                />
            </ButtonToolbar>
        );
    }
}

export default SaveModalButton;
