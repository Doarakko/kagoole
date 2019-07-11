import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import Competitions from './Competitions';
import Solutions from './Solutions';
import Header from './Header';


const routing = (
    <Router>
        <div>
            <Header />
            <Route exact path="/" component={Competitions} />
            <Route path="/competitions" component={Competitions} />
            <Route path="/solutions" component={Solutions} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
