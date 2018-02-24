import React, { PureComponent } from "react";
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import FormNext from 'grommet/components/icons/base/FormNext';
import FormPrevious from 'grommet/components/icons/base/FormPrevious';
import Search from 'grommet/components/Search';
import Anchor from 'grommet/components/Anchor';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import { courses, adjustStatus } from "../../../api/course";
import { errorHnadler } from "../../../utils/util";

export class Courses extends PureComponent {

    state = {
        page: 1,
        search: ''
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

    ChangeStatus = (courseid, status) => {
        return () => {
            adjustStatus.call({courseid, status}, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    Session.set('info', { status: 'ok', content: '课程状态更改成功' })
                }
            })
        }
    }

    render() {
        return (
            <Box className="mc-um" flex={true}>
                <Box direction='row' separator="bottom" className="tool" pad="small" align="center">
                    <Search placeHolder='搜索课程名称' className="search"
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
                <Box pad="small" flex={true} >
                    {
                        this.loading ? (<span>正在加载课程数据 <Spinning /></span>) : (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            课程
                                            </th>
                                        <th>
                                            教师
                                            </th>
                                        <th>
                                            评分
                                            </th>
                                        <th>
                                            状态
                                            </th>
                                        <th>
                                            操作
                                            </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.courses && this.props.courses
                                            .filter(course => {
                                                return course.name.includes(this.state.search) 
                                            })
                                            .slice(this.state.page * 10 - 10, this.state.page * 10)
                                            .map(course => {
                                                return (
                                                    <TableRow key={course._id}>
                                                        <td>
                                                            {course.name}
                                                        </td>
                                                        <td>
                                                            {Meteor.users.find({ _id: { $in: course.teachers } }).map(user => user.profile.name)
                                                                .reduce((pre, curr) => (`${pre} ${curr}`))}
                                                        </td>
                                                        <td>
                                                            {course.evaluate.length !== 0 ? (course.evaluate.map(val => val.star).reduce((total, num) => (total + num)) / course.evaluate.length).toFixed(1) : '0'}
                                                        </td>
                                                        <td>
                                                            {course.status === 1 ? '审核' : '待审核'}
                                                        </td>
                                                        <td className='secondary'>
                                                            <Anchor onClick={this.ChangeStatus(course._id, 1)} >通过</Anchor>
                                                            &nbsp;
                                                            <Anchor onClick={this.ChangeStatus(course._id, 0)} >撤销</Anchor>
                                                        </td>
                                                    </TableRow>
                                                )
                                            })
                                    }
                                </tbody>
                            </Table>
                        )

                    }
                    <Box direction="row" justify="around" pad="small" style={{ marginTop: 'auto' }}>
                        <Anchor icon={<FormPrevious />} onClick={this.pervious} primary={true} />
                        <span>{this.state.page}</span>
                        <Anchor icon={<FormNext />} onClick={this.next} primary={true} />
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default withTracker(() => {
    let handler1 = Meteor.subscribe('courses.all');
    let handler2 = Meteor.subscribe('Meteor.users.teachers');

    return {
        loading: !handler1.ready() && !handler2.ready(),
        courses: courses.find().fetch()
    }
})(Courses);