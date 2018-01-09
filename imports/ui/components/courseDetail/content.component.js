import React, { PureComponent } from 'react';
import { findDOMNode } from "react-dom";

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default class Content extends PureComponent {

    constructor(props) {
        super();
        this.state = {
            editAble: props.editAble || false,
            data: props.data || { name: '标题...', content: null }
        }
    }


    handleChange = (content, delta, source, editor) => {
        let c = editor.getContents();
        this.setState((prevState) => ({name: prevState.data.name, content: c }));
    }
    

    render() {
        return (
            <Box
                colorIndex='light-1' pad="small"
                size={{height: {min: "large"}}}>
                <Heading truncate={true} tag="h2" align="center" ref={(comp) => {  findDOMNode(comp).contentEditable = this.state.editAble }}>
                   {this.state.data.name}
                </Heading>
                <ReactQuill readOnly={!this.state.editAble} placeholder="开始撰写..." value={this.state.data.content}
                    onChange={this.handleChange} />
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