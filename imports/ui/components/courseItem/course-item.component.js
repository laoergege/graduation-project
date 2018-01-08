import React, { PureComponent } from 'react';
import { findDOMNode } from "react-dom";

import Box from "grommet/components/Box";
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Image from 'grommet/components/Image';
import ImgIcon from "grommet/components/icons/base/Image";
import TextInput from 'grommet/components/TextInput';

export class CourseItem extends PureComponent {

    constructor(props) {
        super();
        this.state = {
            imgSrc: props.img
        }
    }

    changeHandler = (e) => {
        this.setState({ imgSrc: e.target.value });
        this.onChange();
    }

    onChange = (e) => {
        this.props.onChange && (this.props.onChange(this.imgEle.value, this.titleEle.innerText, this.introEle.innerText));
    }

    render() {
        return (
            <Box
                direction="row" size={{ width: 'xxlarge', height: { min: 'small' } }}>
                <Box flex={true} colorIndex="light-2" margin="small" align="center" justify="center"
                    style={{ overflow: 'hidden', position: "relative", borderRadius: "10px" }}>
                    {
                        this.state.imgSrc ? (
                            <Image src={this.state.imgSrc} full={true} />
                        ) : (
                                <ImgIcon size="xlarge" />
                            )
                    }
                    {
                        this.props.editAble && (
                            <Box justify="center" full={true} align="center" justify="end"
                                style={{ position: "absolute", backgroundColor: "rgba(0, 0, 1, 0.19)" }}>
                                <TextInput placeHolder="请输入封面 url" onDOMChange={this.changeHandler} value={this.state.imgSrc}
                                    style={{ margin: "0.5rem", color: "aliceblue" }}  ref={(img) => { this.img = img }}/>
                            </Box>
                        )
                    }
                </Box>
                <Box flex={true} pad="small" style={{ overflow: 'hidden' }} >
                    <Section>
                        <Heading tag="h3" ref={(title) => { this.title = title; }}>
                            {this.props.title || 'Write it'}
                        </Heading>
                        <Paragraph ref={(intro) => { this.intro = intro; }}>
                            {this.props.intro || 'Write it'}
                        </Paragraph>
                    </Section>
                </Box>
            </Box>
        )
    }

    componentDidMount() {
        if (this.props.editAble) {
            this.titleEle = findDOMNode(this.title);
            this.introEle = findDOMNode(this.intro);
            this.imgEle = findDOMNode(this.img);            
            this.titleEle.contentEditable = true;
            this.introEle.contentEditable = true;

            this.titleEle.oninput = this.onChange;
            this.introEle.oninput = this.onChange;
            this.imgEle.oninput = this.onChange;
            
        }
    }
}

/**
 * props
 * 
 * editAble: boolean 是否该 item 可编辑,
 * 
 * onChange: function(img, title, intro) img: 课程封面， title： 课程名称， intro：课程基本介绍
 * 
 * img
 * title
 * intro
 */
