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
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'size': ['small', false, 'large', 'huge'] },
                'bold', 'italic', 'underline', 'strike', 'link', 'code', 'blockquote', 'code-block',
            { 'color': [] }, { 'background': [] },
            { 'list': 'ordered' }, { 'list': 'bullet' },
            { 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' },
                'image', 'video', 'clean']
        ]
    }

    constructor(props) {
        super();
        props.editAble || (props.editAble = false);
        props.data || (props.data = { name: '标题...', content: {} });
        props.onChange || (props.onChange =  () => {});
    }

    componentDidMount(){
        let ele = findDOMNode(this.title);
        if (ele) {
            ele.contentEditable = this.props.editAble;
            ele.oninput = this.titleChange
        }
    }

    handleChange = (content, delta, source, editor) => {
        let c = editor.getContents();
        this.props.onChange({...this.props.data, content: c});
    }

    titleChange = (e) => {
        e.preventDefault();
        this.props.data.name = e.target.innerText;
        this.props.onChange({...this.props.data});
    }

    render() {
        let quillClassname = classNames('ql-flex', {'hide-toolbar': this.props.editAble})

        return (
            <Box
                flex={true}
                colorIndex='light-1' pad="small"
                size={{ height: "full" }}>
                <Heading truncate={true} tag="h2" align="center" ref={(comp) => { this.title = comp;}}>
                    {this.props.data.name || '标题'}
                </Heading>
                <ReactQuill
                    className={quillClassname} value={this.props.data.content}
                    readOnly={!this.props.editAble} placeholder="开始撰写..." 
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
 * onChange: function(content)
 */