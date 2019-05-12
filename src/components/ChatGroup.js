import React from "react"

const DEFAULT_CONV_IMAGE = "https://cdn.mantelligence.com/wp-content/uploads/2017/11/weird-conversation-starters.png";

function ChatGroup(props){
    const activeStyle = {
        backgroundColor: '#00bc8c',
        borderRadius: '40%',
    };
    const inactiveStyle = {

    };
        return (
            <div
                onClick={() => props.handleClick(props.id)}
                style={props.active ? activeStyle : inactiveStyle}>
                <img className='avatar' src={props.url || DEFAULT_CONV_IMAGE} alt='avatar'/>
            </div>
        )
}

export default ChatGroup;
