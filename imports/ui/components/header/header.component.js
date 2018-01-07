import React, { Component } from "react";
import { render as createLayer, unmountComponentAtNode } from "react-dom";

import { Link } from "react-router-dom";

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Login from "grommet/components/icons/base/Login";
import Layer from 'grommet/components/Layer';
import LoginForm from 'grommet/components/LoginForm';
import Close from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';
import UserSettings from 'grommet/components/icons/base/UserSettings';
import Logout from 'grommet/components/icons/base/Logout';

export default class extends Component {

    constructor(props) {
        super();
        this.state = {
            logining: false
        }
    }

    toggoleLogForm = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.setState((pre) => ({
            logining: !pre.logining
        }))
    }

    logout = (e) => {
        e.preventDefault();

        Meteor.logout();
        // 清楚会话
        Session.keys = {};
    }

    render() {
        return (
            <Header justify="center" colorIndex="light-1" separator="bottom">
                <Box size={{ width: { max: 'xxlarge' } }} direction="row"
                    responsive={false} justify="start" align="baseline"
                    pad={{ horizontal: 'medium' }} flex="grow">
                    <Title>
                        数据库系统与应用
                    </Title>
                    <Box pad="small" />
                    <Menu inline={true} direction="row" flex="grow" size="small">
                        <Anchor tag="div">
                            <Link to="/NotFound">首页</Link>
                        </Anchor>
                        <Anchor href="#">课程</Anchor>
                        <Anchor href="#">答疑</Anchor>
                        <Anchor href="#">作业</Anchor>
                        <Anchor href="#">资源</Anchor>                        
                    </Menu>

                    <Box>
                        {
                            !this.props.user ? (
                                <Anchor style={{ height: '50px' }} icon={<Login size="small" />}
                                    href='#' onClick={this.toggoleLogForm}>
                                    登录
                                </Anchor>
                            ) : (
                                    <Menu responsive={true}
                                        icon={<UserSettings colorIndex="brand"/>}
                                        label={this.props.user.profile.name}
                                        primary={false}>
                                        <Anchor icon={<Logout />}
                                            onClick={this.logout}
                                            href='#'>
                                            注销
                                        </Anchor>
                                    </Menu>
                                )
                        }
                    </Box>
                </Box>
                {
                    this.state.logining && (
                    <Layer closer={<Button onClick={this.toggoleLogForm} icon={<Close style={{ right: "2rem", position: "fixed" }} />}
                    />}>
                        <LoginForm
                            onSubmit={(user) => {
                                this.props.login(user, this.toggoleLogForm)
                            }}
                            title='Welcome to login'
                            secondaryText='please input your username and password'
                            forgotPassword={<Anchor href='#' label='Forgot password?' />}
                            rememberMe={true}
                            usernameType='text' />
                    </Layer>
                    )
                }
            </Header>
        )
    }
}

/**
 * props{
 *  login: function 接受登录回调方法，回调参数有 user 用户登录信息 toggoleLogForm 切换模态框
 * }
 */