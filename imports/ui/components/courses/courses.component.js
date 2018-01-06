import React, { PureComponent } from 'react';

import Box from "grommet/components/Box";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import { htmlRender } from "../../components/withEditor/with-editor.component";
import Tool from "../tool";
import FormNextLink from "grommet/components/icons/base/FormNextLink";
import Anchor from "grommet/components/Anchor";
import Edit from "grommet/components/icons/base/Edit";
import TextInput from "grommet/components/TextInput";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import createModal from "../modal";


export default class Courses extends PureComponent {

    // 添加课程
    AddCoure = () => {
        let destroy;
        let name;
        let form = (
            <Box
                colorIndex="light-1"
                direction="column" pad={{ between: "small" }} justify="around"
                size={{ width: { min: "medium" }, height: { min: "medium" } }}
                pad="small">
                <Heading align="center">
                    新增课程
                </Heading>
                <TextInput placeHolder="请输入新课程名称" onDOMChange={(e) => {
                    name = e.target.value;
                }} />
                <Box
                    colorIndex="light-1"
                    direction="row" justify="between"
                    size={{ width: { min: "medium" } }}
                    pad="small">
                    <Button label='取消' onClick={() => {
                        destroy();
                    }} />
                    <Button label='新增' primary={true} onClick={() => {
                        if (!name || !(name.trim())) {
                            Session.set('info', { status: 'warning', content: "课程名称不能为空" })
                        } else {
                            Session.set('courseName', name);
                            this.props.history.push('/courses/' + name);
                            destroy();
                        }
                    }} />
                </Box>
            </Box>
        );

        destroy = createModal('layer', form);
    }

    detail = (url) => {
        this.props.history.push(url);
    }

    onMore = () => {
        this.props.onMore(this.props.courses.length);
    }

    render() {
        return (
            <Box
                colorIndex="light-2"
                size={{ width: 'full' }}
                direction="column"
                responsive={true}
                margin={{ top: "small" }} align="center">
                <Box
                    colorIndex="light-2"
                    size={{ width: 'xxlarge' }}
                    direction="column"
                    responsive={true}>

                    <Tool buttons={[
                        { name: "添加课程", icon: Edit, permission: (Session.get('permissions') && Session.get('permissions').editCourse), onClick: this.AddCoure }
                    ]} />

                    <Tiles fill={true} flush={false} style={{ width: "auto" }} onMore={this.onMore} selectable={true}>
                        {
                            this.props.courses && this.props.courses.map((val, i) => {
                                return (
                                    <Tile colorIndex="light-1" pad="small" justify="center" key={i} style={{ position: "relative" }}>
                                        {htmlRender(val.info)}
                                        <Anchor icon={<FormNextLink />}
                                            label='more'
                                            href='#'
                                            primary={true}
                                            style={{ position: "absolute", left: "0.5rem", bottom: "0.5rem" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.detail(this.props.match.path + '/' + val.name)
                                            }} />
                                    </Tile>

                                )
                            })
                        }
                    </Tiles>
                </Box>
            </Box>
        )
    }
}