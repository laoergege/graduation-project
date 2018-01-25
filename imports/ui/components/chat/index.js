import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import SearchInput from 'grommet/components/SearchInput';
import TextInput from 'grommet/components/TextInput';
import Anchor from 'grommet/components/Anchor';
import Headline from 'grommet/components/Headline';
import Send from 'grommet/components/icons/base/Send';
import DocumentUpdate from 'grommet/components/icons/base/DocumentUpdate';

import UserList from "./user-list.component";
import MsgWindow from "./msg-window.component";
import withAnimate from "../animate";

import { getChat, msgs, sendMsg } from "../../../api/chat";

class Chat extends PureComponent {

    constructor(props){
        super();
        this.state = {
            target: null
        }
    }

    componentWillMount() {
        // 若用户为学生，储存教师列表
        getChat.call(null, (error, result) => {
            if (result instanceof Array) {
                result.map((val) => {
                    Meteor.user.insert(val);
                })
            }
        });
    }

    send = () => {
        let msg = {
            _type: 'text',
            content: {text: this.input.value},
            from: Meteor.user()._id,
            to: this.state.target && this.state.target._id,
            createAt: new Date()
        }

        sendMsg.call(msg);
    }

    onEnter = (event) => {
        if (event.keyCode == "13") {
            this.send();
        }
    }

    onSelect = (t) => {
        this.setState({
            target: t
        })
    }

    render() {
        return (
            <Box
                size={{ width: 'full' }} margin={{top: 'small'}} align="center" direction="column">
                <Split flex='right'>
                    <Box colorIndex='light-1' size={{ width: "medium", height: 'large' }} pad="small" className="chat-left">
                        <SearchInput placeHolder='Search' className="search" />
                        <UserList users={this.props.users} onSelect={this.onSelect}/>
                    </Box>
                    <Box colorIndex='light-1' pad="small" size={{ width: "large", height: 'large' }} separator="left"
                        justify="end" className="chat-right">
                        <Headline size='small' style={{marginBottom:"12px"}}>
                            {(this.state.target && this.state.target.profile.name) || ''}
                        </Headline>
                        <MsgWindow />
                        <Box direction="row" separator="top" style={{paddingTop:"12px"}} onKeyUp={this.onEnter}>
                            <TextInput placeHolder="Type something to send" style={{flex: '1'}} ref={(input) => { this.input = input }}/>
                            <Anchor icon={<DocumentUpdate  colorIndex="brand"/>} style={{height: '24px'}} />
                            <Anchor icon={<Send  colorIndex="brand"/>} style={{height: '24px'}} onClick={this.send}/>
                        </Box>
                    </Box>
                </Split>
            </Box>
        )
    }
}

export default withTracker((props) => {
    return{
        users: Meteor.users.find({'profile.roles': {$all: [2]}}).fetch(),
        msgs: msgs.find({}, {sort: {createAt: -1}}).fetch()
    }
})(withAnimate(Chat));