import React, { PureComponent } from "react";
import { Switch, Route } from "react-router";

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import Logout from 'grommet/components/icons/base/Logout';
import Actions from 'grommet/components/icons/base/Actions';
import _Menu from 'grommet/components/icons/base/Menu';
import Spinning from 'grommet/components/icons/Spinning';

import withAnimate from "../animate";
import './style.scss';
import UM from "./um.component";
import Permissions from "./permissions.component";
import Notification from "../notification";
import Courses from "./courses.component";
import Bundle from "../../../utils/bundle";

export class ManagementCenter extends PureComponent {

    state = {
        hideMenu: false,
        path: '',
        active: 1
    }

    hide = {
        display: 'none'
    }

    // 切换菜单
    toggleMenu = () => {
        this.setState(preState => ({
            hideMenu: !preState.hideMenu
        }))
    }

    homeSetupModule =  async (callBack) => {
        const HW = (await import("/imports/ui/components/management/home-setup.component.js")).default;
        callBack(HW);
    }

    ActiveModule = async (callBack) => {
        const HW = (await import("/imports/ui/components/management/active.component.js")).default;
        callBack(HW);
    }

    componentWillMount() {
        // 定向到 用户管理
        this.props.history.replace(`${this.props.match.path}/um`);
        this.state.path = this.props.match.path;
    }

    render() {
        return (
            <Split flex="right" className="mc">
                <Sidebar colorIndex='brand' size="small" fixed={true} style={this.state.hideMenu && this.hide} className="mc-sidebar" >
                    <Notification />
                    <Box pad="medium"></Box>
                    <Header pad={{ horizontal: 'medium' }} justify='between'>
                        <Heading tag='h4' strong={true}>
                            公告
                        </Heading>
                    </Header>
                    <Box flex='grow'
                        justify='start'>
                        <Menu primary={true}>
                            <Anchor path={`${this.props.match.path}/homeSetup`} onClick={() => {
                                this.setState({ active: 4 });
                            }}
                                className={this.state.active === 4 ? 'active' : ''}>
                                首页设置
                                </Anchor>
                        </Menu>
                    </Box>
                    <Header pad={{ horizontal: 'medium' }} justify='between'>
                        <Heading tag='h4' strong={true}>
                            监控
                        </Heading>
                    </Header>
                    <Box flex='grow'
                        justify='start'>
                        <Menu primary={true}>
                            <Anchor path={`${this.props.match.path}/active`} onClick={() => {
                                this.setState({ active: 5});
                            }}
                                className={this.state.active === 5 ? 'active' : ''}>
                                用户活跃
                                </Anchor>
                        </Menu>
                    </Box>
                    <Header pad={{ horizontal: 'medium' }} justify='between'>
                        <Heading tag='h4' strong={true}>
                            管理
                        </Heading>
                    </Header>
                    <Box flex='grow'
                        justify='start'>
                        <Menu primary={true}>
                            <Anchor path={`${this.props.match.path}/um`} onClick={() => {
                                this.setState({ active: 1 });
                            }}
                                className={this.state.active === 1 ? 'active' : ''}>
                                用户管理
                                </Anchor>
                            {/* <Anchor path={`${this.props.match.path}/permissions`} onClick={() => {
                                this.setState({active: 2});
                            }} className={this.state.active === 2 ? 'active' : ''}>
                                权限管理
                            </Anchor> */}
                            <Anchor path={`${this.props.match.path}/courses`} onClick={() => {
                                this.setState({ active: 3 });
                            }} className={this.state.active === 3 ? 'active' : ''}>
                                课程管理
                            </Anchor>
                        </Menu>
                    </Box>
                    <Header pad={{ horizontal: 'medium' }} justify='between'>
                        <Heading tag='h4' strong={true}>
                            系统设置
                        </Heading>
                    </Header>
                    <Footer pad='medium'>
                        <Anchor path="/" icon={<Logout />}>
                            退出
                            </Anchor>
                    </Footer>
                </Sidebar>
                <Box colorIndex='light-2' full={true}>
                    <Header pad='small' justify='between' colorIndex="light-1" className="mc-header">
                        <Button icon={<_Menu />}
                            onClick={this.toggleMenu} />
                        <Box flex={true}
                            justify='end'
                            direction='row'
                            responsive={false}>
                            <Menu icon={<Actions />}
                                dropAlign={{ "right": "right" }}>
                                <Anchor href='#'
                                    className='active'>
                                    First
                                    </Anchor>
                                <Anchor href='#'>
                                    Second
                                    </Anchor>
                                <Anchor href='#'>
                                    Third
                                    </Anchor>
                            </Menu>
                        </Box>
                    </Header>
                    <Box pad="small">
                        <Box margin="medium" colorIndex="light-1" size={{ height: { min: 'large' } }}>
                            <Switch>
                                <Route path={`${this.props.match.path}/um`} component={UM} />
                                {/* <Route path={`${this.props.match.path}/permissions`} component={Permissions}/> */}
                                <Route path={`${this.props.match.path}/courses`} component={Courses} />
                                <Route path={`${this.props.match.path}/homeSetup`} render={() => {
                                    return (
                                        <Bundle load={this.homeSetupModule}>
                                            {(Comp) => Comp
                                                ? <Comp />
                                                : (<Box full={true} align="center" justify="center" direction="row">请稍等... <Spinning /></Box>)
                                            }
                                        </Bundle>
                                    )
                                }} />
                                <Route path={`${this.props.match.path}/active`} render={() => {
                                    return (
                                        <Bundle load={this.ActiveModule}>
                                            {(Comp) => Comp
                                                ? <Comp />
                                                : (<Box full={true} align="center" justify="center" direction="row">请稍等... <Spinning /></Box>)
                                            }
                                        </Bundle>
                                    )
                                }}  />                                
                            </Switch>
                        </Box>
                    </Box>
                </Box>
            </Split>
        )
    }
}

export default withAnimate(ManagementCenter);