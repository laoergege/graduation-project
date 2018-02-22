import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import UserNew from 'grommet/components/icons/base/UserNew';
import Search from 'grommet/components/Search';
import Anchor from 'grommet/components/Anchor';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';


export class UM extends PureComponent {

    rolesToStr = (roles) => {
        let str = '';
        roles.forEach(ele => {
            if (ele === 1) {
                str += ' 管理员 '
            } else if (ele === 2) {
                str += ' 教师 '
            } else {
                str += ' 学生 '
            }
        });
        return str;
    }

    render() {
        return (
            <Box className="mc-um">
                <Box direction='row' separator="bottom" className="tool" pad="small" align="center">
                    <Anchor icon={<UserAdd />}
                        onClick={() => { }} >新增用户</Anchor>
                    <Anchor icon={<UserNew />}
                        onClick={() => { }} >批量导入</Anchor>
                    <Search placeHolder='Search' className="search"
                        inline={true}
                        responsive={false}
                        value=''
                        onDOMChange={() => { }} />
                </Box>
                <Box direction='row' pad="small">
                    <Box direction='row' flex={true} separator="right" justify="center" align="center">
                        {
                            this.loading ? (<span>正在加载用户数据 <Spinning /></span>) : (
                                <Table>
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
                                            this.props.users.map(user => {
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
                                                            <Anchor onClick={() => { }} >编辑</Anchor>
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
                    </Box>
                    <Box direction='row' flex={true}>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default withTracker(() => {
    let handle = Meteor.subscribe('Meteor.users.pages', 0);

    return {
        loading: !handle.ready(),
        users: Meteor.users.find().fetch()
    }
})(UM)

