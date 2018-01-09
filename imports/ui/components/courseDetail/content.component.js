import React, { PureComponent } from 'react';
import { findDOMNode } from "react-dom";

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import classNames from "classnames";

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default class Content extends PureComponent {

    // 定义 quill 工具栏
    modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] },
                'bold', 'italic', 'underline', 'strike', 'link', 'code', 'blockquote', 'code-block',
            { 'color': [] }, { 'background': [] },
            { 'list': 'ordered' }, { 'list': 'bullet' },
            { 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' },
                'image', 'video'],
            ['clean']                                         // remove formatting button
        ]
    }

    constructor(props) {
        super();
        this.state = {
            editAble: props.editAble || false,
            data: props.data || { name: '标题...', content: "" }
        }
    }


    handleChange = (content, delta, source, editor) => {
        let c = editor.getContents();
        // this.setState((prevState) => ({name: prevState.data.name, content: c }));
    }


    render() {
        let quillClassname = classNames('ql-flex', {'hide-toolbar': this.editAble})

        return (
            <Box
                flex={true}
                colorIndex='light-1' pad="small"
                size={{ height: "full" }}>
                <Heading truncate={true} tag="h2" align="center" ref={(comp) => { comp && (findDOMNode(comp).contentEditable = this.state.editAble) }}>
                    {this.state.data.name}
                </Heading>
                <ReactQuill
                    className={quillClassname}
                    readOnly={!this.state.editAble} placeholder="开始撰写..." value={this.state.data.content}
                    onChange={this.handleChange} modules={this.modules} />
            </Box>
        )
    }
}

/**
 * props:
 * 
 * editAble: boolean
 * data: {name, content}
 */