import React, {Component} from "react"
import ChatGroup from './ChatGroup'
import bgPic from "../assets/mntnFHD_compressed_cut.jpeg";
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'
import '../styles/MainPage.scss'


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [
                {id: 345, url: 'https://randomuser.me/api/portraits/med/women/21.jpg'},
                {id: 243, url: 'https://randomuser.me/api/portraits/med/men/56.jpg'},
                {id: 834, url: 'https://randomuser.me/api/portraits/med/men/47.jpg'},
                {id: 153, url: 'https://randomuser.me/api/portraits/med/women/96.jpg'},
                {id: 152, url: 'https://randomuser.me/api/portraits/med/women/79.jpg'}
            ],
            nrOfGroups: 4,
            activeGroup: this.props.actualConversationID,
            message: 'piszę do ',
            messages: this.props.onConvarsationChange(this.props.actualConversationID)
                

        };
    }

    handleSend(){
        if (this.state.message) {
            this.setState(prevState => {
                const id = prevState.messages[prevState.messages.length - 1] + 1;
                prevState.messages.push({
                    id: id,
                    message: prevState.message,
                    id_sender: 154
                });
                prevState.message = '';
                return prevState
            });
        }
    }

    handleChangeInput(event){
        const {value} = event.target;
        this.setState({
            message: value
        });

    }


    groupChanged = (id) => {
        console.log("Group changed");
        this.setState({
            activeGroup: id,
            messages: this.props.onConvarsationChange(id)
        });
        console.log(`Active group: ${this.state.activeGroup}`);
    };


    render() {
        const messagesList = this.state.messages.map(message =>
            <div key={message.id}>{message.message}</div>);

        const groupsCompList =
            this.state.groups.map(chat =>
                <ChatGroup
                    key={chat.id}
                    id={chat.id}
                    url={chat.url}
                    handleClick={this.groupChanged}
                    active={chat.id === this.state.activeGroup}/>);

        return (
            <div id='chat-body'
                 style={{backgroundImage: `url(${bgPic})`}}>
                <div className='main-container'>
                    <div id='groups'>
                        {/*<ChatGroup url={TLogo} />*/}
                        {groupsCompList}

                    </div>
                    <div id='chat'>
                        <div className='chat-head'>

                            <h3>Hannah Reed</h3>


                            <div className='send-form'>

                            </div>

                        </div>
                        <div className='messages' id='mess' ref={(node) => { this.node = node; }}>
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
                    <div id='details'>
                        {/*DETAILS*/}
                        {/*{this.state.message}*/}
                    </div>
                </div>
            </div>
    )
    }
}

export default MainPage;
