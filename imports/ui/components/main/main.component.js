import React, { Component } from 'react';
import { Route } from "react-router";

import './main.scss';

import Box from 'grommet/components/Box';
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Button from "grommet/components/Button";
import Split from "grommet/components/Split";
import Edit from "grommet/components/icons/base/Edit";

import Header from "../header";
import CourseItem from "../courseItem";
import HwList from "../homework/hw-list.component";
import Intro from "../main/intro.component";
import Notice from "./notice.component";
import TeachersInto from "./teachers.component";
import Comment from "./comment.component";
import { evalCourse } from "../../../api/course";
import { errorHnadler } from "../../../utils/util";
import { CourseSchema, editCourse, courses } from "../../../api/course";
import Resourse from "./resourse.component";

export default class Main extends Component {

    constructor(props) {
        super();
        this.course = Object.assign({}, props.course);
        this.state = {
            main: null
        }
    }

    saverFactory = (key) => {
        return (content) => {
            Session.set(key, content);
        }
    }

    release = (e) => {
        e.preventDefault();
        this.props.release(this.course);
    }

    itemChange = (img, title, intro) => {
        if (this.course) {
            this.course.info = { img, title, intro };
        }
    }

    detail = (e) => {
        e.preventDefault();
        this.props.history.push('/courses/' + this.props.match.params.name + '/content');
    }

    // 监听用户评价
    onEvalue = (comment) => {
        if (comment) {
            this.course.evaluate.push(comment);
            CourseSchema.clean(this.course);
            evalCourse.call(this.course, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    Session.set('info', { status: 'ok', content: '评价成功！' });
                }
            })
        }
    }

    // 监听用户上传资源
    onUp = (resourseid) => {
        if (resourseid) {
            this.course.resourses.push(resourseid);
            CourseSchema.clean(this.course);
            editCourse.call(this.course, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    Session.set('info', { status: 'ok', content: '上传成功！' });
                }
            })
        }
    }

    // 监听用户删除资源
    onRemove = (resourseid) => {
        if (resourseid) {
            this.course.resourses = this.course.resourses.filter(id => id !== resourseid);
            CourseSchema.clean(this.course);
            editCourse.call(this.course, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    Session.set('info', { status: 'ok', content: '删除成功！' });
                }
            })
        }
    }

    componentWillMount() {
        Session.set('course', this.props.course);
        this.props.history.push(`${this.props.match.url}/介绍`);
    }

    render() {
        return (
            <div className="main-v-2018112205">
                <Box
                    colorIndex="light-1"
                    size={{ width: 'full', height: 'medium' }}
                    direction="column"
                    responsive={true}>

                    <Box
                        size={{ width: 'full' }} justify="center" align="center"
                        flex={true} >
                        <Box size={{ width: 'xxlarge', height: 'medium' }} direction="row" responsive={true} justify="center"
                            pad="small">
                            <CourseItem editAble={this.props.permissions && this.props.permissions.editCourse} onChange={this.itemChange}
                                title={(this.course.info && this.course.info.title) || this.course.name}
                                intro={(this.course.info && this.course.info.intro) || ''}
                                img={(this.course.info && this.course.info.img) || ''} />
                        </Box>
                    </Box>

                    <Box size={{ width: 'full' }} direction="row" responsive={true} className="sticky--top"
                        pad={{ horizontal: 'small', between: 'small' }} justify="center">
                        <Box size={{ width: 'xxlarge' }} direction="row" responsive={true} >
                            <Menu responsive={false}
                                inline={true}
                                direction='row'
                                align="baseline">
                                <Anchor path={`${this.props.match.url}/介绍`}
                                    className='active'>
                                    课程介绍
                                </Anchor>
                                <Anchor path={`${this.props.match.url}/教师介绍`}>
                                    教师简介
                                </Anchor>
                                <Anchor path={`${this.props.match.url}/评价`}>
                                    评价
                                </Anchor>
                                <Anchor path={`${this.props.match.url}/资源`}>
                                    资源下载
                                </Anchor>
                                {
                                    this.props.permissions && this.props.permissions.getHW && (
                                        <Anchor path={`${this.props.match.url}/作业`}>
                                            作业
                                        </Anchor>
                                    )
                                }
                                {
                                    this.props.permissions && this.props.permissions.editCourse && (
                                        <Anchor icon={<Edit />} onClick={this.detail}>
                                            编辑章节内容
                                        </Anchor>
                                    )
                                }
                                {
                                    this.props.permissions && this.props.permissions.editCourse && (
                                        <Button label="发布/更新" onClick={this.release} />
                                    )
                                }

                            </Menu>
                        </Box>
                    </Box>
                </Box>

                <Box
                    size={{ width: 'full' }}
                    margin={{ top: 'small' }}
                    pad={{ between: "small" }} justify="center" direction="row">

                    <Box colorIndex="light-1"
                        pad='medium'
                        size={{ width: 'xlarge' }}>
                        <Route path={`${this.props.match.path}/作业`} render={() => {
                            return <HwList courseid={this.props.course._id} />
                        }} />
                        <Route path={`${this.props.match.path}/介绍`} render={() => {
                            return <Intro intro={this.props.course.mainInfo} onChange={(content) => {
                                this.course.mainInfo = content;
                            }} />
                        }} />
                        <Route path={`${this.props.match.path}/教师介绍`} render={() => {
                            return <TeachersInto courseid={this.props.course._id} />
                        }} />
                        <Route path={`${this.props.match.path}/评价`} render={() => {
                            return <Comment courseid={this.props.course._id} onSubmit={this.onEvalue} />
                        }} />
                        <Route path={`${this.props.match.path}/资源`} render={() => {
                            return <Resourse onUp={this.onUp} courseid={this.props.course._id} onRemove={this.onRemove} />
                        }} />
                    </Box>
                    <Box
                        size={{ width: 'small' }}>
                        <Notice content={this.course.notice} onChange={(content) => {
                            this.course.notice = content;
                        }} />
                    </Box>

                </Box>

            </div>
        )
    }
}

/**
 * props
 * 
 * release 回调函数，用于发布更新课程信息
 * course 课程
 */