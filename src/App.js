import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import SearchPage from "./components/SearchPage";
import AccountPage from "./components/AccountPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";



class App extends Component {
  render() {
    return (
        <BrowserRouter style={{height: '100%'}}>
            <div style={{height: '100%'}}>
                <Navigation/>
                <Switch className="bg-dark" style={{height: '100%'}}>
                    <Route path="/" component={MainPage} exact/>
                    <Route path="/login" component={LoginPage} exact/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
