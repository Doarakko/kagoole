import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import SaveModalButton from './modal/SaveModalButton';


class Header extends React.Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg" className="header">
                <Navbar.Brand>Kagoole</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mb-2 mr-sm-2 mb-sm-0">
                        <Link to="/competitions">Competition</Link>
                    </Nav>
                    <Nav className="mb-2 mr-sm-2 mb-sm-0">
                        <Link to="/solutions">Solution</Link>
                    </Nav>
                    <Nav className="mb-2 mr-sm-2 mb-sm-0">
                        <SaveModalButton buttonText='Add Solution' />
                    </Nav>
                    <Nav className="mb-2 mr-sm-2 mb-sm-0 navbar-collapse justify-content-end">
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZlhz5UK92LLY126uBaKXIl8AstQpaxlPhWcC8aHO2SE5FeQ/viewform?usp=sf_link">Contact</a>
                    </Nav>
                    <Nav>
                        <a href="https://github.com/Doarakko/kagoole">GitHub</a>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        );
    }
}

export default Header;