import React, {Component} from "react"
import {Container, MiddleBox} from "./LoginPage-styles"

class LogoutPage extends Component {

    constructor(props){
        super(props);
        this.props.changeAutorizationStatus();
    }

    render() {
        return (
          <Container>
            <MiddleBox>
              You are Logged Out!
            </MiddleBox>
          </Container>
        );
    }
}

export default LogoutPage;
