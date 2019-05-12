import React, {Component} from "react"
import {ADD_USER_TO_CONV, getConversationGql} from "../queries/queries";
import {graphql} from "react-apollo";
import {compose} from "react-apollo";
import '../styles/Details.scss'

const DEFAULT_CONV_IMAGE = "https://cdn.mantelligence.com/wp-content/uploads/2017/11/weird-conversation-starters.png";

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addUser: false,
            inputInvite: '',
        }
    }

    onAddUser = (event) => {
        const invitedUserNick = this.state.inputInvite;
        console.log(invitedUserNick);
        if (invitedUserNick && invitedUserNick !== '') {
            this.setState({
                inputInvite: ''
            });
            this.props.addUserToConv({
                variables: {
                    nickname: invitedUserNick,
                    id_conv: this.props.idActiveConv
                }
            });
        }
    };

    changeInputInvite(event) {
        const {value} = event.target;
        this.setState({
            inputInvite: value
        });
    }

    render() {
        const avatarUrl = this.props.data.conversation ? this.props.data.conversation.avatarUrl : DEFAULT_CONV_IMAGE;
        const convName = this.props.data.conversation ? this.props.data.conversation.name : '';
        const contributors = this.props.data.conversation ? this.props.data.conversation.contributors : [];
        const contribView = contributors.map(item => {
            return <div key={item.id}>🧑{item.nickname}</div>
        });
        return (
            <div id={'details'} className={"details"}>
                {console.log("Details: this.props")}
                {console.log(this.props)}
                <img src={avatarUrl} height="100px" width="100px"/>
                <div><h3 align={"center"}>{convName}</h3></div>
                <div>{contribView}</div>
                <button onClick={() => this.onAddUser()}>➕</button>
                <input type="text"
                       value={this.state.inputInvite}
                       onChange={event => this.changeInputInvite(event)}
                />
            </div>
        );
    }
}


export default compose(
    graphql(getConversationGql, {
        options: (props) => ({
            variables: {
                activeConversation: props.idActiveConv
            }
        })
    }),
    graphql(ADD_USER_TO_CONV, {
        name: 'addUserToConv'
    })
)(Details);
