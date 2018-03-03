import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';
import { Switch, Route } from "react-router";

import Box from 'grommet/components/Box';
import FormNext from 'grommet/components/icons/base/FormNext';
import FormPrevious from 'grommet/components/icons/base/FormPrevious';
import Search from 'grommet/components/Search';
import Anchor from 'grommet/components/Anchor';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Legend from 'grommet/components/Legend';
import Timestamp from 'grommet/components/Timestamp';

import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend as L, Line } from 'recharts';

import { permissions } from "../../../api/permissions";
import { editUser } from "../../../api/users";
import { errorHnadler } from "../../../utils/util";
import { actives } from "../../../api/active";

export class Active extends PureComponent {

    state = {
        page: 1,
        search: ''
    }

    online = {
        backgroundColor: '#8cc800'
    }

    outline = {
        backgroundColor: '#ffd602'
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
                    <Legend series={[
                        { "label": "在线", "colorIndex": "ok" },
                        { "label": "离线", "colorIndex": "warning" }
                    ]} />

                    <Search placeHolder='搜索用户名' className="search"
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
                <Box direction='row' pad="small">
                    <Box flex={true} separator="right" justify="center" align="center" style={{flex: 1}}>
                        {
                            this.loading ? (<span>正在加载用户数据 <Spinning /></span>) : (
                                <Table style={{ flex: 1 }}>
                                    <thead>
                                        <tr>
                                            <th>
                                                用户编号
                                        </th>
                                            <th>
                                                最近登录时间
                                        </th>
                                            <th>
                                                IP
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.users.filter(val => {
                                                return val.profile.name.includes(this.state.search) ||
                                                    val.profile.username.includes(this.state.search) 
                                            })
                                                .slice(this.state.page * 10 - 10, this.state.page * 10)
                                                .map(user => {
                                                    return (
                                                        <TableRow key={user._id} style={user.status.online ? this.online : this.outline}>
                                                            <td>
                                                                {user.username}
                                                            </td>
                                                            <td>
                                                                <Timestamp value={user.status.lastLogin ? user.status.lastLogin.date : '' } />
                                                            </td>
                                                            <td>
                                                                {user.status.lastLogin && user.status.lastLogin.ipAddr}
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
                    <Box  style={{flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Box pad="small">{`当前在线人数:${this.props.users.filter(user => user.status.online).length}`}</Box>
                        <div>
                            <LineChart width={730} height={250} data={this.props.actives}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <L />
                                <Line type="monotone" dataKey="online" stroke="#8cc800" name="在线人数" />
                                <Line type="monotone" dataKey="outline" stroke="#ffd602"  name="离线人数"/>
                            </LineChart>
                        </div>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default withTracker(() => {
    let handle = Meteor.subscribe('Meteor.users');
    let handle1= Meteor.subscribe('actives');    

    return {
        loading: !handle.ready(),
        loading1: !handle1.ready(),        
        users: Meteor.users.find({}, {sort: {'status.online': -1}}).fetch(),
        actives: actives.find({}, {sort: {_id: 1}}).fetch()
    }
})(Active)

