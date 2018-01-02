import React, { Component } from 'react'

import Box from 'grommet/components/Box';
import Header from "../../components/header";
import Main from "../../components/main";
import Notification from "../../components/notification";

import { Session } from "meteor/session";

export default class Index extends Component {

    // 登录
    login = ({username, password}, toggle) => {
        Meteor.loginWithPassword(username, password, (error) => {
            if(error)
                Session.set('info', {status: 'warning', content: '用户名或密码错误！'});
            else
                toggle();
        })
    }

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
                wrap={false}>

                <Header login={this.login}/>

                <Main />
               
                <Notification />
            </Box>
        )
    }
}