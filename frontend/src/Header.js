import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


class Header extends React.Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg" className="header">
                <Navbar.Brand href="#home">Kagoole</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mb- mr-sm-2 mb-sm-0">
                        <Link to="/solutions">Solution</Link>
                    </Nav>
                    <Nav className="mb-2 mr-sm-2 mb-sm-0">
                        <Link to="/competitions">Competition</Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <a href="https://github.com/Doarakko/kagoole">GitHub</a>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        );
    }
}

export default Header;