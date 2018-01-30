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
import Image from 'grommet/components/Image';
import Title from 'grommet/components/Title';

import UserList from "./user-list.component";
import MsgWindow from "./msg-window.component";
import withAnimate from "../animate";

import { errorHnadler } from "../../../utils/util";

import { getChat, sendMsg, msgs, chatfiles } from "../../../api/chat";

class Chat extends PureComponent {

    state = {
        target: null,
        value: ''
    }

    componentWillMount() {
        getChat.call();
    }

    send = () => {
        if (!this.state.target) {
            Session.set('info', { status: 'warning', content: '请先选择对象！' })
        }

        if (this.state.value.trim() === '') {
            this.setState({
                value: ''
            })
            return;
        }

        let msg = {
            _id: (new Mongo.ObjectID())._str,
            _type: 'text',
            content: { text: this.state.value },
            from: Meteor.user()._id,
            to: this.state.target && this.state.target._id,
            createAt: new Date()
        }

        msgs.insert(msg, () => {
            sendMsg.call(msg, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    this.setState({
                        value: ''
                    })
                }
            });
        })

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

    onInput = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    openFD = () => {
        this.msgwindow.openFD();
    }

    onDrop = (files) => {
        if (!this.state.target) {
            Session.set('info', { status: 'warning', content: '请先选择对象！' })
            return;
        }

        const reader = new FileReader();

        reader.onload = () => { 
            msgs.insert({
                _id: (new Mongo.ObjectID())._str,
                _type: 'image',
                content: { image: reader.result },
                from: Meteor.user()._id,
                to: this.state.target && this.state.target._id,
                createAt: new Date()
            })
        };

        files.forEach(file => {
            let res = file.type.includes('image');

            if (res) {
                reader.readAsDataURL(file);
            }else{
                msgs.insert({
                    _id: (new Mongo.ObjectID())._str,
                    _type: 'file',
                    content: {name: file.name, size: file.size},
                    from: Meteor.user()._id,
                    to: this.state.target && this.state.target._id,
                    createAt: new Date()
                });
            }
          
            chatfiles.insert({
                file: file,
                streams: 'dynamic',
                chunkSize: 'dynamic',
                onUploaded: (error, fileObj) => {
                    if (error) {
                        Session.set('info', { status: 'critical', content: error })
                    } else {
                        sendMsg.call({
                            _id: (new Mongo.ObjectID())._str,
                            _type: res ? 'image' : 'file',
                            content: res ? ({ image: fileObj._id }) : ({name: fileObj.name, size: fileObj.size, file: fileObj._id}),
                            from: Meteor.user()._id,
                            to: this.state.target && this.state.target._id,
                            createAt: new Date()
                        });
                    }
                }
            })
        });
    }

    render() {
        return (
            <Box
                size={{ width: 'full' }} margin={{ top: 'small' }} align="center" direction="column">
                <Split flex='right'>
                    <Box colorIndex='light-1' size={{ width: "medium", height: 'large' }} pad="small" className="chat-left">
                        <SearchInput placeHolder='Search' className="search" />
                        <UserList users={this.props.users} onSelect={this.onSelect} msgs={this.props.msgs} />
                    </Box>
                    <Box colorIndex='light-1' pad="small" size={{ width: "large", height: 'large' }} separator="left"
                        justify="end" className="chat-right">
                        <Box align='center' direction="row" separator="bottom" style={{ height: '30px' }}
                            pad='small'>
                            {this.state.target && (<Image src='/img/chat.png' size='thumb' style={{ objectFit: 'contain' }} />)}
                            <Box margin={{ left: 'small' }} >
                                <Title> {(this.state.target && this.state.target.profile.name) || ''}</Title>
                            </Box>
                        </Box>
                        <MsgWindow msgs={this.state.target ? msgs.find({ $or: [{ 'from': this.state.target._id }, { to: this.state.target._id }] }).fetch() : []}
                            ref={(mw) => { this.msgwindow = mw; }} onDrop={this.onDrop} />
                        <Box direction="row" separator="top" style={{ paddingTop: "12px" }} onKeyUp={this.onEnter}>
                            <TextInput placeHolder="Type something to send" style={{ flex: '1' }} onDOMChange={this.onInput} value={this.state.value} />
                            <Anchor icon={<DocumentUpdate colorIndex="brand" />} style={{ height: '24px' }} onClick={this.openFD} />
                            <Anchor icon={<Send colorIndex="brand" />} style={{ height: '24px' }} onClick={this.send} />
                        </Box>
                    </Box>
                </Split>
            </Box>
        )
    }
}

export default withTracker((props) => {
    console.log(msgs.find({}, { sort: { createAt: -1 } }).fetch())
    return {
        msgs: msgs.find({}, { sort: { createAt: -1 } }).fetch(),
        users: Meteor.users.find().fetch().filter((val) => (val._id !== Meteor.user()._id))
    }
})(withAnimate(Chat));