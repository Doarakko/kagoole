import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import SaveModalButton from './modal/SaveModalButton';


class Header extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand>Kagoole</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mb-2 mr-sm-2 mb-sm-0">
                        <Link to="/competitions" style={{ color: "white" }}>Competition</Link>
                    </Nav>
                    <Nav className="mb-2 mr-sm-2 mb-sm-0">
                        <Link to="/solutions" style={{ color: "white" }}>Solution</Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <SaveModalButton buttonText='Add Solution' />
                    </Nav>
                    <Nav>
                        <Nav.Link href="https://twitter.com/kagoole" style={{ color: "white" }}>Twitter</Nav.Link>
                        <Nav.Link href="https://github.com/Doarakko/kagoole" style={{ color: "white" }}>GitHub</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;