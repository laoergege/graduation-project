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
            else{
                toggle();
                // 订阅用户信息
                Meteor.subscribe("Meteor.users.initials");
            }
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
                wrap={false}
                style={{"minHeight": '100vh'}}>

                <Header login={this.login}/>

                {/* <Main /> */}
                {this.props.children || '系统出错了！'}

                <Notification />
            </Box>
        )
    }
}