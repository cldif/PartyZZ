import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from "./Register";
import AppHeader from "./AppHeader";

function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader/>
                <Switch>
                    <Route path={'/register'} component={Register}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;