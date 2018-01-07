import React, { Component } from 'react';

import './main.scss';

import Box from 'grommet/components/Box';
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Split from "grommet/components/Split";
import Edit from "grommet/components/icons/base/Edit";

import Header from "../header";
import CourseItem from "../courseItem";

export default class Main extends Component {

    saverFactory = (key) => {
        return (content) => {
            Session.set(key, content);
        }
    }

    release = (e) => {
        e.preventDefault();
        this.props.release(this.props.course);
    }

    itemChange = (img, title, intro) => {
        if (this.props.course) {
            this.props.course.info = { img, title, intro };
        }
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
                            <CourseItem editAble={true} onChange={this.itemChange}  title={this.props.course.courseName} />
                        </Box>
                    </Box>

                    <Box size={{ width: 'full' }} direction="row" responsive={true} className="sticky--top"
                        pad={{ horizontal: 'small', between: 'small' }} justify="center">
                        <Box size={{ width: 'xxlarge' }} direction="row" responsive={true} >
                            <Menu responsive={false}
                                inline={true}
                                direction='row'
                                align="baseline">
                                <Anchor href='#'
                                    className='active'>
                                    课程简介
                                </Anchor>
                                <Anchor href='#'>
                                    教师简介
                                </Anchor>
                                <Anchor href='#'>
                                    评价
                                </Anchor>

                                {
                                    this.props.permissions && this.props.permissions.editCourse && (
                                        <Anchor href='#' onClick={this.release}>
                                            发布/更新
                                        </Anchor>
                                    )
                                }
                                {
                                    this.props.permissions && this.props.permissions.editContent && (
                                        <Anchor href='#' icon={<Edit />}>
                                            编辑章节内容
                                        </Anchor>
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
                        justify='center'
                        align='center'
                        pad='medium'
                        size={{ width: 'xxlarge' }}>
                        {this.props.editor(this.saverFactory('mainInfo'), (this.props.course ? this.props.course.mainInfo : null)) || 'Write it'}
                    </Box>
                    <Box
                        colorIndex="ok"
                        justify='center'
                        align='center'
                        pad='medium'
                        size={{ width: 'small' }}>
                        Right Side
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