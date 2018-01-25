import React, { PureComponent } from "react";

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

class Chat extends PureComponent {
    render() {
        return (
            <Box
                size={{ width: 'full' }} margin={{top: 'small'}} align="center" direction="column">
                <Split flex='right'>
                    <Box colorIndex='light-1' size={{ width: "medium", height: 'large' }} pad="small" className="chat-left">
                        <SearchInput placeHolder='Search' className="search" />
                        <UserList />
                    </Box>
                    <Box colorIndex='light-1' pad="small" size={{ width: "large", height: 'large' }} separator="left"
                        justify="end" className="chat-right">
                        <Headline size='small' style={{marginBottom:"12px"}}>
                            Sample Headline
                        </Headline>
                        <MsgWindow />
                        <Box direction="row" separator="top" style={{paddingTop:"12px"}}>
                            <TextInput placeHolder="Type something to send" style={{flex: '1'}}/>
                            <Anchor icon={<DocumentUpdate  colorIndex="brand"/>} style={{height: '24px'}} />
                            <Anchor icon={<Send  colorIndex="brand"/>} style={{height: '24px'}} />
                        </Box>
                    </Box>
                </Split>
            </Box>
        )
    }
}

export default withAnimate(Chat);