import React, { PureComponent } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Image from 'grommet/components/Image';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import Spinning from 'grommet/components/icons/Spinning';

import { inviteTeacher } from "../../../api/course";


export class TeacherInto extends PureComponent {

    state = {
        target: undefined
    }

    render() {
        return (
            <Box>
                {
                    this.props.loading ? (
                        <Box  align="center" justify="center" direction="row">正在获取教师信息 <Spinning /></Box>
                    ) : (
                            <Box>
                                {
                                    this.props.permissions && this.props.permissions.editCourse && (
                                        <Box direction="row" justify="center" separator="bottom" pad="small">
                                            <Select placeHolder='邀请其他教师加入'
                                                value={this.target}
                                                options={Meteor.users.find({ 'profile.roles': { $all: [2] } }).map(val => ({ value: val, label: `${val.profile.num}-${val.profile.name}` }))}
                                                onChange={(val) => {
                                                    this.setState({
                                                        target: val.value
                                                    })
                                                }} />
                                            <Button label='邀请'
                                                onClick={() => {
                                                    let course = { ...Session.get('course') };
                                                    course.teachers.push(this.state.target.value._id);
                                                    inviteTeacher.call(course, () => {
                                                        if (error) {
                                                            errorHnadler(error);
                                                        } else {
                                                            Session.set('info', { status: 'ok', content: '邀请成功！' });
                                                        }
                                                    })
                                                }} />
                                        </Box>
                                    )
                                }
                                {
                                    this.props.teachers && this.props.teachers.map((val, i) => {
                                        let user = Meteor.users.findOne({ _id: val })
                                        return (
                                            <Box direction="row" align="center" justify="center" pad="small" key={user._id}>
                                                {i % 2 === 0 && <Image src={user.profile.avater || '/img/teacher.png'} size='small' />}
                                                <Card
                                                    label='教师'
                                                    heading={user.profile.name}
                                                    description={user.profile.intro || '暂无简介'} />
                                                {i % 2 !== 0 && <Image src={user.profile.avater || '/img/teacher.png'} size='small' />}
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        )
                }
            </Box>
        )
    }
}

export default withTracker(() => {
    let handler = Meteor.subscribe('Meteor.users.teachers');
    return {
        loading: !handler.ready(),
        permissions: Session.get('permissions')
    }
})(TeacherInto)