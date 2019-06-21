import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Solutions from './Solutions';
import Competitions from './Competitions';
import Header from './Header';
import ModalButton from './modal/ModalButton';



const routing = (
    <Router>
        <div>
            <Header />
            <ModalButton />
            <Route exact path="/" component={Solutions} />
            <Route path="/solutions" component={Solutions} />
            <Route path="/competitions" component={Competitions} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
