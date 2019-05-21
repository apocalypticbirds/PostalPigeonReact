import React, { Component } from "react"

class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.nicknameEl = React.createRef();
        this.passwordEl = React.createRef();
        this.state = {
        };
    }

    submitHandler = event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        const nicnkname = this.nicknameEl.current.value;
        if (email.trim().length === 0 || password.trim().length === 0 || nicnkname.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
        mutation{
            addUser(email: "${email}", password: "${password}", nickname: "${nicnkname}"){
                id
                nickname
                email
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
            console.log(res);
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            if(!resData.data.addUser){
                this.setState({ registered: true });      
            }else{
                this.setState({ registered: false });    
                console.log("Hello " + resData.data.addUser.nickname + "!");            
            }
        }).catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div>
            <form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" ref={this.emailEl} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordEl} />
                </div>
                <div className="form-control">
                    <label htmlFor="nickname">Nickname</label>
                    <input type="text" ref={this.nicknameEl} />
                </div>
                <div className="form-actions">
                    <button type="submit">Register</button>
                </div>
            </form> 
                {console.log(this.state.registered)}
                {this.state.registered == undefined ? <div></div> : 
                    this.state.registered ? <div>Incorrect data or e-mail/nickname already exist</div> : <div>You are registered, now you can log in!</div> }
            </div>);
    }
}

export default RegistrationPage;