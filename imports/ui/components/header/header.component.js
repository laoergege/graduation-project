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
import SettignsOption from 'grommet/components/icons/base/SettignsOption';

import { msgs } from "../../../api/chat";

export default class extends Component {

    constructor(props) {
        super();
        this.state = {
            logining: false
        }
    }

    subscriptions = [];

    componentWillMount() {
        // 订阅用户信息
        this.subscriptions.push(Meteor.subscribe("Meteor.users.initials"));
    }

    toggoleLogForm = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.setState((pre) => ({
            logining: !pre.logining
        }))
    }

    // 登录
    login = ({ username, password }, toggle) => {
        Meteor.loginWithPassword(username, password, (error) => {
            if (error)
                Session.set('info', { status: 'warning', content: '用户名或密码错误！' });
            else {
                toggle();
                // 订阅用户信息
                this.subscriptions.push(Meteor.subscribe("Meteor.users.initials"));
            }
        })
    }

    logout = (e) => {
        e.preventDefault();

        this.subscriptions.forEach(val => {
            val && val.stop();
        });

        msgs.remove({});

        Meteor.logout();

        this.props.history.push('/');
    }

    goTo = (route) => {
        return () => {
            this.props.history.push(route);
        }
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
                            <Link to="/home">首页</Link>
                        </Anchor>
                        <Anchor href="#" onClick={this.goTo('/courses')}>课程</Anchor>
                        <Anchor href="#">资源</Anchor>
                        {
                            this.props.permissions && this.props.permissions.getChat && (
                                <Anchor href="#" onClick={() => {
                                    Session.set('notice', 0);
                                    this.props.history.push('/chat');
                                }}>答疑{this.props.notice ? `(+${this.props.notice})` : ''}</Anchor>
                            )
                        }
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
                                        icon={<UserSettings colorIndex="brand" />}
                                        label={this.props.user.profile.name}
                                        primary={false}>
                                        {
                                            Meteor.user() && Meteor.user().profile.roles.includes(1) && (
                                                <Anchor icon={<SettignsOption />}
                                                    path={'/managementcenter'}>
                                                    管理中心
                                                </Anchor>
                                            )
                                        }
                                        <Anchor icon={<Logout />}
                                            onClick={this.logout}
                                            href='#'>
                                            密码修改
                                        </Anchor>
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
                                    this.login(user, this.toggoleLogForm)
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

