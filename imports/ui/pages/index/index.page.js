import React, { Component } from 'react'

import Box from 'grommet/components/Box';
import Header from "../../components/header";
import Main from "../../components/main";
import Notification from "../../components/notification";

import { Session } from "meteor/session";

export default class Index extends Component {

    render() {
        return (
            <Box justify='start'
                align='stretch'
                wrap={true}
                reverse={false}
                pad='none'
                margin='none'
                primary={true}
                full="horizontal"
                colorIndex='light-2'
                separator="bottom"
                wrap={false}
                style={{ "minHeight": '100vh' }}>

                <Header />

                {/* <Main /> */}
                {this.props.children || '系统出错了！'}

                <Notification />
            </Box>
        )
    }
}