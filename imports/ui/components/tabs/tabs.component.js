import React, { Component } from 'react'

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

export default class Tabs extends Component {
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
                        <Anchor href="#">搜索</Anchor>
                    </Menu>

                    <Box>
                        <Anchor style={{ height: '50px' }} icon={<Login size="small" />}
                            href='#'>
                            登录
                    </Anchor>
                    </Box>
                </Box>
            </Header>
        )
    }
}