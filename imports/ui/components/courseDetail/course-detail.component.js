import React, { PureComponent } from 'react';

import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Sections from "./sections.component";
import Content from "./content.component";
import Label from 'grommet/components/Label';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { editSection } from "../../../api/sections";
import { errorHnadler } from "../../../utils/util";

export default class CourseDetail extends PureComponent {

    componentWillMount() {
        Meteor.subscribe('sections', this.props.course._id);
    }

    addSection = (name) => {
        let newSection = {
            name: name,
            courseid: this.props.course._id,
            contents: [],
            order: this.props.course.sections.length + 1
        };
        editSection.call(newSection, (error) => {
            if (error) {
                errorHnadler(error);
            } else {
                Session.set('info', { status: 'ok', content: '新增章节成功！' });
            }
        })
    }

    // 修改章节名称
    changeSN = (name, i) => {
        let section = this.props.sections[i];

        editSection.call({ ...section, name: name }, (error) => {
            if (error) {
                errorHnadler(error);
            } else {
                Session.set('info', { status: 'ok', content: '更新章节成功！' });
            }
        })
    }

    render() {
        return (
            <Box
                size={{ width: 'full' }}
                margin={{ top: 'small' }}
                pad={{ between: "small" }} align="center" direction="column">
                <Split flex='right'>
                    <Box colorIndex='light-2' size="small"
                        pad='small'>
                        <Sections data={this.props.sections} onClick={this.addSection}
                            editAble={this.props.editCourse} onChange={this.changeSN} />
                    </Box>
                    <Box colorIndex='light-2' size="xlarge" align='stretch' >
                        <Box direction="row" justify="between" align="baseline" >
                            <Label margin="none" truncate={true}>
                                {'前言 / 课程简介'}
                            </Label>
                            <Menu responsive={false}
                                direction='row'>
                                <Anchor href='#'>
                                    删除
                                </Anchor>
                                <Anchor href='#'>
                                    本地暂存
                                </Anchor>
                                <Anchor href='#'>
                                    发布/更新
                                </Anchor>
                            </Menu>
                        </Box>
                        <Content editAble={this.props.editCourse} />
                    </Box>
                </Split>
            </Box>
        )
    }
}

/**
 * props
 * 
 * course
 * sections: [{name, order, contents: [{name, content: object]}]
 */
