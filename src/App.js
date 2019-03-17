import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import SearchPage from "./components/SearchPage";
import AccountPage from "./components/AccountPage";
import LogoutPage from "./components/LogoutPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import MainPage from "./components/MainPage";





class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSignIn: true,
        }
        //methods binding
        this.changeAutorizationStatus = this.changeAutorizationStatus.bind(this);
    }

   changeAutorizationStatus = () => {
       this.setState((prevState) => {
           return { isSignIn: !prevState.isSignIn };
       })
       console.log(this.state.isSignIn);
    };

  render() {
    return (
        <BrowserRouter style={{height: '100%'}}>
            <div style={{height: '100%'}}>
                <Navigation
                    autorizationStatus={this.state.isSignIn}                     
                    />
                <Switch className="bg-dark" style={{height: '100%'}}>
                    <Route path="/" component={MainPage} exact/>                    
                    <Route path="/logout" 
                        render={() => <LogoutPage changeAutorizationStatus={this.changeAutorizationStatus}/>} exact />
                    <Route path="/login" render={() => <LoginPage/>} exact />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

//<Route path="/login" component={LoginPage} exact />


export default App;
