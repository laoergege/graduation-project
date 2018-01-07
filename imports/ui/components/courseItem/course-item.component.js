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
        this.props.onChange && (this.props.onChange(this.state.imgSrc, this.title.innerText, this.intro.innerText));
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
                                <TextInput placeHolder="请输入封面 url" onDOMChange={this.changeHandler}
                                    style={{ margin: "0.5rem", color: "aliceblue" }} />
                            </Box>
                        )
                    }
                </Box>
                <Box flex={true} style={{ overflow: 'hidden' }}>
                    <Section>
                        <Heading tag="h2" ref={(title) => { this.title = title; }}>
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
            this.title = findDOMNode(this.title);
            this.intro = findDOMNode(this.intro);
            this.title.contentEditable = true;
            this.intro.contentEditable = true;

            this.title.oninput = this.onChange;
            this.intro.oninput = this.onChange;
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
