import React, {Component} from "react"
import ChatGroup from './ChatGroup'
import bgPic from "../assets/mntnFHD_compressed_cut.jpeg";
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'
import '../styles/MainPage.scss'
import {compose, graphql, Query} from "react-apollo";
import {ADD_CONVERSATION, getConversationGql, getMe, sendMessageGql} from "../queries/queries";
import Message from "./Message";
import Details from "./Details";
import TLogo from '../assets/TLogo_cut.png'

const POOL = 1000;

class MainPage extends Component {

    constructor(props) {
        super(props);
        // const {conversation} = this.props.data.getConversationGql;
        this.state = {
            groups: [],
            idActiveConversation: 0,
            // conversation: conversation,
            message: '',
            // messages: this.props.onConvarsationChange(this.state.idActiveConversation),
            // chatName: this.props.getChatName(this.state.idActiveConversation)

        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({state: this.state});
            this.forceUpdate();
            // alert("TIMEOUT")
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    handleChangeInput(event) {
        const {value} = event.target;
        this.setState({
            message: value
        });
    }

    groupChanged = (id) => {
        console.log("Group changed");
        this.setState({
            idActiveConversation: id,
        });
        console.log(`Active group: ${this.state.idActiveConversation}`);
    };

    handleSend() {
        const message = this.state.message;
        if (message) {
            const id_conv = this.state.idActiveConversation;
            const id_sender = this.state.id_user;

            this.props.sendMessageGql({
                variables: {
                    content: message,
                    id_conv: id_conv,
                    id_sender: id_sender
                }
            });
            this.setState(prevState => {
                prevState.message = '';
                return prevState
            });
        }
    }

    onAddConversation = () => {
        this.props.addConversation({
            variables: {
                conv_name: 'NewConversation',
            }
        });
        return 'xd'
    };

    getGroups() {
        return <Query query={getMe} pollInterval={POOL}>
            {({loading, error, data}) => {
                if (loading) return `Loading...`;
                if (error) return `Error! ${error}`;

                return data.me.conversations.map((conv, index) =>
                    <ChatGroup
                        key={index}
                        id={conv.id}
                        url={conv.avatarUrl}
                        handleClick={this.groupChanged}
                        active={conv.id === this.state.idActiveConversation}/>);
            }}
        </Query>
    };

    getMessages() {
        const activeConversation = this.state.idActiveConversation;
        if (activeConversation !== 0) {
            return (<Query query={getConversationGql} variables={{activeConversation}} pollInterval={POOL}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error}`;
                    console.log("data");
                    console.log(data);
                    return data.conversation.messages.map((message, index) =>
                        <Message
                            key={index}
                            model={message}
                            isActive={message.sender.id === this.props.userId}>
                        </Message>);
                }}
            </Query>)
        } else {
            return "No conversation"
        }
    }

    render() {
        const {
            idActiveConversation,
            groups
        } = this.state;
        console.log(this.props);
        const conversationGql = this.props.getConversationGql;
        const messagesList = this.state.idActiveConversation ? this.getMessages() : [];

        console.log("conversationGql");
        console.log(conversationGql);

        const groupsCompList = this.getGroups();
        return (
            <div id='chat-body'
                 style={{backgroundImage: `url(${bgPic})`}}>
                <div className='main-container'>
                    <div id='groups'>
                        <ChatGroup id={'0'} url={"https://primephotosevents.com/static/img/icon-plus-circled.svg"} handleClick={this.onAddConversation}/>
                        {groupsCompList}


                    </div>
                    <div id='chat'>
                        <div className='chat-head'>

                            <h3>{this.state.chatName}</h3>


                            <div className='send-form'>

                            </div>

                        </div>
                        <div className='messages' id='mess' ref={(node) => {
                            this.node = node;
                        }}>
                            {messagesList}
                        </div>

                        <div className='send-form'>
                            <input
                                value={this.state.message}
                                type='text'
                                onChange={event => this.handleChangeInput(event)}
                                className='form-control'/>
                            <img src={Photo} alt='uploadPh'/>
                            <img src={File} alt='file'/>
                            <img src={Send} alt='send'
                                 onClick={() => this.handleSend()}/>
                        </div>
                    </div>
                    <Details idActiveConv={idActiveConversation}/>
                    {/*<div id='details'>*/}
                    {/*    <div>{groups[idActiveConversation] ? groups[idActiveConversation].name : ""}</div>*/}
                        {/*DETAILS*/}
                        {/*{this.state.message}*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}


export default compose(
    // graphql(getConversationGql, {name: 'getConversationGql'}),
    graphql(sendMessageGql, {name: 'sendMessageGql'}),
    graphql(getConversationGql, {name: 'getConversationGql'}),
    graphql(ADD_CONVERSATION, {name: 'addConversation'})
)(MainPage);
