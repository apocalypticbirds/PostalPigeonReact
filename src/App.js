import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NotFound from "./components/NotFound";
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
    };

  render() {
    return (
        <BrowserRouter style={{height: '100%'}}>
            <div style={{height: '100%'}}>
                <Navigation
                    autorizationStatus={this.state.isSignIn}
                    />
                <Switch className="bg-dark" style={{height: '100%'}}>
                    <Route path="/"
                        render={()=><MainPage onConvarsationChange={this.getMessagesForConversation}
                            getChatName={this.getChatName}
                        actualConversationID={0}/>} exact/>
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

export default App;
