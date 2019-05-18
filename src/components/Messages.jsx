import React, { Component } from "react"
import { getConversationGql } from "../queries/queries";
import { graphql } from "react-apollo";
import Message from "./Message";

class Messages extends Component {
    constructor(props) {
        super(props);
    }

    getMessages = () => {
        const messages = this.props.data.conversation ? this.props.data.conversation.messages.map((message, index) =>
            <Message
                key={index}
                model={message}
                isActive={message.sender.id === this.props.userId}>
            </Message>)
            : [];
        return messages;
    }

    render() {
        return (
            <div  className='messages' id='mess' >
                {this.getMessages()}
            </div>
            // <div>hehe
            //     {console.log("Messages component")}
            //     {console.log(this.props.data.conversation.messages)}
            // }</div>
        )
    }
}

export default
    graphql(getConversationGql, {
        options: (props) => ({
            variables: {
                activeConversation: props.idConv
            },
            pollInterval: 500,
            fetchPolicy: "network-only"
        })
    })
        (Messages);
