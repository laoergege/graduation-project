import React, { PureComponent } from 'react';

import Box from "grommet/components/Box";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Tool from "../tool";
import FormNextLink from "grommet/components/icons/base/FormNextLink";
import Anchor from "grommet/components/Anchor";
import Edit from "grommet/components/icons/base/Edit";
import TextInput from "grommet/components/TextInput";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import createModal from "../modal";
import CourseItem from "../courseItem";
import Spinning from 'grommet/components/icons/Spinning';


export default class Courses extends PureComponent {

    state = {
        page: 1,
        search: ''
    }

    // 添加课程
    AddCoure = () => {
        let destroy;
        let name;
        let form = (
            <Box
                colorIndex="light-1"
                direction="row" pad={{ between: "small" }} justify="between"
                size={{ width: { min: "medium" }}}
                pad="small">
                <TextInput placeHolder="请输入新课程名称" onDOMChange={(e) => {
                    name = e.target.value;
                }} />
                <Box
                    colorIndex="light-1"
                    direction="row" justify="around"
                    size={{ width: { min: "small" } }}>
                    <Button label='取消' style={{margin: '0 5px'}} onClick={() => {
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
        // this.props.onMore(this.props.courses.length);
        if (this.props.courses.length > this.state.page*4) {
            this.setState((pre) => ({page: pre.page+1}))
        }
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
                        { name: "添加课程", icon: Edit, permission: (this.props.permissions && this.props.permissions.editCourse), onClick: this.AddCoure }
                    ]} searchPH="课程名称" onChange={(name) => {
                        this.setState({
                            search: name
                        })
                    }}/>

                    {
                        this.props.loading ? (
                            <Box align="center" justify="center" direction="row">获取课程数据中 <Spinning /></Box>
                        ) : (
                                <Tiles fill={true} flush={false} style={{ width: "auto" }} onMore={this.onMore} selectable={true}>
                                    {
                                        this.props.courses && this.props.courses
                                        .filter(val => val.name.includes(this.state.search))
                                        .slice(0, this.state.page * 4)
                                        .map((val, i) => {
                                            return (
                                                <Tile colorIndex="light-1" pad="small" justify="center" key={val._id} style={{ position: "relative" }}>
                                                    <CourseItem editAble={false} img={val.info.img} title={val.info.title} intro={val.info.intro} />
                                                    <Anchor icon={<FormNextLink />}
                                                        label='more'
                                                        href='#'
                                                        primary={true}
                                                        style={{ position: "absolute", right: "0.5rem", bottom: "0.5rem" }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            this.detail(this.props.match.path + '/' + val.name)
                                                        }} />
                                                </Tile>

                                            )
                                        })
                                    }
                                </Tiles>
                            )
                    }
                </Box>
            </Box>
        )
    }
}