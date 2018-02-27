import React, { PureComponent } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import classNames from "classnames";
import Box from 'grommet/components/Box';

export class Intro extends PureComponent {

    // 定义 quill 工具栏
    modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'size': ['small', false, 'large', 'huge'] },
                'bold', 'italic', 'underline', 'strike', 'link', 'code', 'blockquote', 'code-block',
            { 'color': [] }, { 'background': [] },
            { 'list': 'ordered' }, { 'list': 'bullet' },
            { 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' },
                'image', 'video', 'clean']
        ]
    }

    handleChange = (content, delta, source, editor) => {
        this.props.onChange(editor.getContents());
    }

    render() {

        return (
            <Box
                flex={true}
                colorIndex='light-1' pad="small"
                size={{ height: "full" }}>
                <ReactQuill
                    className={this.props.permissions && this.props.permissions.editCourse ? '' : 'hide-toolbar'} value={this.props.intro || {}}
                    readOnly={this.props.permissions ? !this.props.permissions.editCourse : true} placeholder="编写课程相关介绍：课程简介、课程教案、实验内容、教学大纲等之类...."
                    onChange={this.handleChange} modules={this.modules} />
            </Box>
        )
    }
}

export default withTracker((props) => {
    return {
        permissions: Session.get('permissions'),
        ...props
    }
})(Intro)