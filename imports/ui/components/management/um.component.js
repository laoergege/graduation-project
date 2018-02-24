import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';
import { Switch, Route } from "react-router";

import Box from 'grommet/components/Box';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import UserNew from 'grommet/components/icons/base/UserNew';
import FormNext from 'grommet/components/icons/base/FormNext';
import FormPrevious from 'grommet/components/icons/base/FormPrevious';
import Search from 'grommet/components/Search';
import Anchor from 'grommet/components/Anchor';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import RadioButton from 'grommet/components/RadioButton';

import { permissions } from "../../../api/permissions";
import { editUser } from "../../../api/users";
import { errorHnadler } from "../../../utils/util";

export class UM extends PureComponent {

    state = {
        target: null,
        isAdding: false,
        page: 1,
        search: ''
    }

    rolesToStr = (roles) => {
        let str = '';
        roles.forEach(ele => {
            if (ele === 1) {
                str += ' 管理员 '
            } else if (ele === 2) {
                str += ' 教师 '
            } else if (ele === 3) {
                str += ' 学生 '
            } else {
                str += ' 游客 '
            }
        });
        return str;
    }

    roleToNum = (role) => {
        if (role.includes('管理员')) {
            return 1;
        } else if (role.includes('教师')) {
            return 2;
        } else if (role.includes('学生')) {
            return 3;
        } else if (role.includes('游客')) {
            return 4;
        }
    }

    edit = (user) => {
        return () => {
            this.props.history.push(`${this.props.match.path}/user/setup`);
            this.setState({ target: user })
        }
    }

    addUser = () => {
        this.props.history.push(`${this.props.match.path}/user/setup`);
        this.setState({ isAdding: true });
        this.setState({
            target: {
                profile: {
                    num: '',
                    name: '',
                    roles: [],
                    intro: ''
                }
            }
        });
    }

    submit = (e) => {
        if (this.state.target) {
            if (this.state.target.profile.num === '') {
                Session.set('info', { status: 'warning', content: '编号不能为空' });
                return;
            }
            if (this.state.target.profile.name === '') {
                Session.set('info', { status: 'warning', content: '姓名不能为空' });
                return;
            }
            if (this.state.target.profile.roles.length === 0) {
                Session.set('info', { status: 'warning', content: '组别不能为空' });
                return;
            }
            editUser.call(this.state.target, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    Session.set('info', { status: 'ok', content: '编辑用户成功' })
                }
            })
        }
    }

    next = () => {
        this.setState((per) => {
            return {
                page: per.page + 1
            }
        })
    }

    pervious = () => {
        if (this.state.page !== 1) {
            this.setState((per) => {
                return {
                    page: per.page - 1
                }
            })
        }
    }

    render() {
        return (
            <Box className="mc-um" flex={true}>
                <Box direction='row' separator="bottom" className="tool" pad="small" align="center">
                    <Anchor icon={<UserAdd />}
                        onClick={this.addUser} >新增用户</Anchor>
                    <Anchor icon={<UserNew />}
                        onClick={() => { }} >批量导入</Anchor>
                    <Search placeHolder='搜索用户名、编号、组别' className="search"
                        inline={true}
                        responsive={false}
                        value={this.state.search}
                        onDOMChange={(e) => {
                            this.setState({
                                search: e.target.value,
                                page: 1
                            })
                        }} />
                </Box>
                <Box direction='row' pad="small" flex={true}>
                    <Box flex={true} separator="right" justify="center" align="center">
                        {
                            this.loading ? (<span>正在加载用户数据 <Spinning /></span>) : (
                                <Table style={{ flex: 1 }}>
                                    <thead>
                                        <tr>
                                            <th>
                                                学号/工号
                                        </th>
                                            <th>
                                                姓名
                                        </th>
                                            <th>
                                                组
                                        </th>
                                            <th>
                                                操作
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.users.filter(val => {
                                                return val.profile.name.includes(this.state.search) ||
                                                    val.profile.num.includes(this.state.search) ||
                                                    val.profile.roles.includes(this.roleToNum(this.state.search))

                                                })
                                                .slice(this.state.page * 10 - 10, this.state.page * 10)
                                                .map(user => {
                                                    return (
                                                        <TableRow key={user._id}>
                                                            <td>
                                                                {user.profile.num}
                                                            </td>
                                                            <td>
                                                                {user.profile.name}
                                                            </td>
                                                            <td>
                                                                {this.rolesToStr(user.profile.roles)}
                                                            </td>
                                                            <td className='secondary'>
                                                                <Anchor onClick={this.edit(user)} >编辑</Anchor>
                                                                &nbsp;
                                                            <Anchor onClick={() => { }} >删除</Anchor>
                                                            </td>
                                                        </TableRow>
                                                    )
                                                })
                                        }
                                    </tbody>
                                </Table>
                            )

                        }
                        <Box direction="row" justify="around" pad="small" style={{ width: '100%' }}>
                            <Anchor icon={<FormPrevious />} onClick={this.pervious} primary={true} />
                            <span>{this.state.page}</span>
                            <Anchor icon={<FormNext />} onClick={this.next} primary={true} />
                        </Box>
                    </Box>
                    <Box direction='row' flex={true} justify="center" align="center">
                        {
                            <Switch>
                                <Route exact={true} path={`${this.props.match.path}/user/setup`} render={({ match }) => {
                                    return (
                                        <Form>
                                            <FormFields>
                                                <FormField label='编号'>
                                                    <TextInput value={this.state.target ? this.state.target.profile.num : ''} onDOMChange={(e) => {
                                                        this.state.target.profile.num = e.target.value;
                                                        this.state.target.username = e.target.value;
                                                        this.setState({
                                                            target: { ...this.state.target }
                                                        })
                                                    }} />
                                                </FormField>
                                                <FormField label='姓名'>
                                                    <TextInput value={this.state.target ? this.state.target.profile.name : ''} onDOMChange={(e) => {
                                                        this.state.target.profile.name = e.target.value;
                                                        this.setState({
                                                            target: { ...this.state.target }
                                                        })
                                                    }} />
                                                </FormField>
                                                <FormField label='简介'>
                                                    <textarea value={this.state.target ? this.state.target.profile.intro : ''} onChange={(e) => {
                                                        this.state.target.profile.intro = e.target.value;
                                                        this.setState({
                                                            target: { ...this.state.target }
                                                        })
                                                    }} />
                                                </FormField>
                                                <FormField label='组别' key={this.state.target && this.state.target._id}>
                                                    {/* {!this.state.isAdding && this.state.target && (<div style={{ textAlign: 'center' }}>{this.rolesToStr(this.state.target.profile.roles)}</div>)} */}
                                                    {
                                                        this.state.target && (
                                                            this.props.permissions.map(val => {
                                                                console.log(this.state.target.profile.roles.includes(val.id) ? true : false)
                                                                return (
                                                                    <RadioButton key={val._id}
                                                                        checked={this.state.target.profile.roles.includes(val.id) ? true : false}
                                                                        id={val.id + ''}
                                                                        value={val.id + ''}
                                                                        label={val.name}
                                                                        onChange={(e) => {
                                                                            this.state.target.profile.roles = [parseInt(e.target.value)];
                                                                            this.state.target.permissions = this.props.permissions[e.target.value - 1].permissions;
                                                                            this.setState({
                                                                                target: { ...this.state.target }
                                                                            });
                                                                            this.forceUpdate();
                                                                        }} />
                                                                )
                                                            })
                                                        )
                                                    }
                                                </FormField>
                                                <FormField label='权限'>
                                                    <div style={{ textAlign: 'center' }}><Anchor path={`${match.path}/permissions`}>权限设置</Anchor></div>
                                                </FormField>
                                            </FormFields>
                                            <Footer pad={{ "vertical": "medium" }}>
                                                <Button label='提交'
                                                    type='button'
                                                    primary={true}
                                                    onClick={this.submit} />
                                            </Footer>
                                        </Form>
                                    )
                                }} />
                                <Route exact={true} path={`${this.props.match.path}/user/setup/permissions`} render={() => {
                                    return (
                                        <Form>
                                            <FormFields>
                                                <FormField label="权限">
                                                    {
                                                        this.state.target && this.state.target.permissions.map((val, i) => (
                                                            <CheckBox label={val.name} key={val.name} checked={val.allow} onChange={(e) => {
                                                                this.state.target.permissions[i].allow = true;
                                                                this.setState({
                                                                    target: { ...this.state.target }
                                                                })
                                                            }} />
                                                        ))
                                                    }
                                                </FormField>
                                            </FormFields>
                                            <Footer pad={{ "vertical": "medium" }}>
                                                <Button label='返回'
                                                    type='button'
                                                    primary={true}
                                                    path={`${this.props.match.path}/user/setup`} style={{ marginRight: '5px' }} />
                                                <Button label='设置'
                                                    type='button'
                                                    primary={true}
                                                    onClick={this.submit} />
                                            </Footer>
                                        </Form>
                                    )
                                }} />
                            </Switch>
                        }

                    </Box>
                </Box>
            </Box>
        );
    }
}

export default withTracker(() => {
    let handle = Meteor.subscribe('Meteor.users.pages', 0);
    Meteor.subscribe('permissions');

    return {
        loading: !handle.ready(),
        users: Meteor.users.find().fetch(),
        permissions: permissions.find().fetch()
    }
})(UM)

