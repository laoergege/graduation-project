import React, { Component } from 'react'

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Actions from "grommet/components/icons/base/Action";
import Search from "grommet/components/Search";

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
                full={true}
                colorIndex='light-2'>
                <Header fixed={true}>
                    <Box
                        pad="small">
                        <Title>
                            数据库系统与应用
                    </Title>
                    </Box>
                    <Box flex={true}
                        justify='end'
                        pad="small"
                        direction='row'
                        responsive={false}>
                        <Menu
                            inline={true}
                            responsive={true}
                            direction='row'
                            dropAlign={{ "right": "right" }}>
                            <Anchor href='#'
                                className='active'>
                                First
                        </Anchor>
                            <Anchor href='#'>
                                登录
                        </Anchor>
                            <Anchor href='#'>
                                注册
                        </Anchor>
                        </Menu>
                    </Box>
                </Header>
                {this.props.children || "Welcome to your Inbox"}
            </Box>
        )
    }
}