import React, {Component} from 'react';
import '../styles/auth-form.css';

class LoginPage extends Component {
  state = {
    isLogin: true
  };

  constructor(props) {
    super(props);
    this.state = {
        isLogin: this.props.isSignIn
    };
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    console.log(this.state.isLogin);
  }

  signIn = () => {
      this.setState(prevState => {
          return {isLogin: !prevState.isLogin};
      })
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query{
            login(email: "${email}", password: "${password}"){
                userId
                token
                tokenExpiration
            }
        }
      `
    };

    //request to back-end
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
        if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed!');
        }
        return res.json();
    }).then(resData => {
        !this.state.isLogin ? this.props.changeAutorizationStatus(): console.log("already logged");
        this.props.changeToken(resData.data.login.token);
        this.props.changeUserId(resData.data.login.userId);
        this.props.changeTokenExpiration(resData.data.login.tokenExpiration);
        console.log(resData.data.login.token);
    }).catch(err => {
        console.log(err);
    });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">          
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
}

export default LoginPage;