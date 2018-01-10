import React, { PureComponent } from 'react';

import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Sections from "./sections.component";
import Content from "./content.component";
import Label from 'grommet/components/Label';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { addSection, alterSection, editSection, ContentSchema } from "../../../api/sections";
import { errorHnadler } from "../../../utils/util";

export default class CourseDetail extends PureComponent {

    currContent;

    componentWillMount() {
        Meteor.subscribe('sections', this.props.course._id);
    }

    addSection = (name, type, sectionid) => {
        if (type === 0) {
            let newSection = {
                name: name,
                courseid: this.props.course._id,
                contents: [],
                order: this.props.sections.length + 1
            };
            addSection.call(newSection, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    Session.set('info', { status: 'ok', content: '新增章节成功！' });
                }
            })
        } else {
            let content = { name, order: this.props.sections.filter(val => val._id === sectionid)[0].contents.length + 1 };
            ContentSchema.clean(content);
            editSection.call({ sectionid, content }, (error) => {
                if (error) {
                    errorHnadler(error);
                } else {
                    Session.set('info', { status: 'ok', content: '新增章节成功！' });
                }
            })
        }
    }

    // 修改章节名称
    changeSN = (name, i) => {
        let section = this.props.sections[i];

        alterSection.call({ _id: section._id, name }, (error) => {
            if (error) {
                errorHnadler(error);
            } else {
                Session.set('info', { status: 'ok', content: '更新章节成功！' });
            }
        })
    }

    // 发布更新章节
    publish = () => {
        ContentSchema.clean(this.currContent);
        editSection.call({ sectionid: this.props.sections[this.props.Order]._id, content: this.currContent }, (error) => {
            if (error) {
                errorHnadler(error);
            } else {
                Session.set('info', { status: 'ok', content: '发布/更新成功！' });
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
                    <Box colorIndex='light-2' size={{ width: "xlarge" }} align='stretch' style={{ height: "100%" }}>
                        {
                            this.props.postion && (
                                <Box direction="row" justify="between" align="baseline" >
                                    <Label margin="none" truncate={true}>
                                        {this.props.postion}
                                    </Label>
                                    {
                                        this.props.editCourse && (
                                            <Menu responsive={false}
                                                direction='row'>
                                                <Anchor href='#'>
                                                    删除
                                                </Anchor>
                                                <Anchor href='#'>
                                                    本地暂存
                                                </Anchor>
                                                <Anchor href='#' onClick={this.publish}>
                                                    发布/更新
                                                </Anchor>
                                            </Menu>
                                        )
                                    }
                                </Box>
                            )
                        }
                        {
                            this.props.postion && (
                                <Content editAble={this.props.editCourse} data={this.props.sections[this.props.Order] && 
                                    this.props.sections[this.props.Order].contents[this.props.order]} onChange={(content) => {
                                    this.currContent = content;
                                }} />
                            )
                        }
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
