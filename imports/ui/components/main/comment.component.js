import React, { PureComponent } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { findDOMNode } from "react-dom";

import ReactStars from 'react-stars';

import Box from 'grommet/components/Box';
import Quote from 'grommet/components/Quote';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from "grommet/components/Anchor";
import Value from 'grommet/components/Value';

import { courses } from "../../../api/course";

export class Comment extends PureComponent {

    constructor(props){
        super();

        this.state = {
            star: 0,
            content: '课程非常棒！'
        }
    }

    handleChange = (e) => {
        this.state.star = e;
    }

    submit = () => {
        this.props.onSubmit && this.props.onSubmit({
            userid: Meteor.userId(),
            name: Meteor.user().profile.name,
            star: this.state.star,
            content: this.state.content
        })
    }

    render() {
        return (
            <Box>
                <Box direction="row" justify="between" align="center" separator="bottom">
                    <ReactStars
                        count={5}
                        edit={false}
                        value={this.props.evaluate && this.props.evaluate.length !== 0 ? this.props.evaluate.map(val => val.star).reduce((total, num) => (total + num))/this.props.evaluate.length : 0}
                        size={24} 
                        color2={'#ffd700'} />
                    <span>
                        <Value value={this.props.evaluate && this.props.evaluate.length !== 0 ? (this.props.evaluate.map(val => val.star).reduce((total, num) => (total + num))/this.props.evaluate.length).toFixed(1) : 0} colorIndex="critical" />
                        分
                    </span>
                </Box>
                {
                    this.props.permissions &&  this.props.permissions.evalCourse && this.props.evaluate && this.props.evaluate.filter(val => {
                        return val.userid === Meteor.userId();
                    }).length === 0 && (
                        <Box separator="bottom">
                            <Box direction="row" pad="small" align="center" justify="between">
                                <ReactStars
                                    count={5}
                                    onChange={this.handleChange}
                                    half={false}
                                    size={24}
                                    color2={'#ffd700'} />
                                <Anchor
                                    onClick={this.submit} >提交</Anchor>
                            </Box>
                            <Quote credit={Meteor.user() && Meteor.user().profile.name} style={{ border: 'none' }}
                                borderColorIndex='brand'>
                                <Paragraph ref={(ele) => {
                                    let e = findDOMNode(ele);
                                    if (e) {
                                        e.contentEditable = true;
                                        e.oninput = (e) => {
                                            this.state.content = e.target.innerText;
                                        }   
                                    }
                                }}>
                                    {this.state.content}
                                </Paragraph>
                            </Quote>
                        </Box>
                    )
                }
                {
                    this.props.evaluate && this.props.evaluate.map(val => {
                        return (
                            <Box separator="bottom" key={val.userid}>
                                <Box direction="row" pad="small" align="center" justify="between">
                                    <ReactStars
                                        edit={false}
                                        count={5}
                                        value={val.star}
                                        size={24}
                                        color2={'#ffd700'} />
                                </Box>
                                <Quote credit={val.name} style={{ border: 'none' }}>
                                    <Paragraph>
                                        {val.content}
                                    </Paragraph>
                                </Quote>
                            </Box>
                        )
                    })
                }
            </Box>
        )
    }
}

export default withTracker((props) => {

    return {
        permissions: Session.get('permissions'),
        evaluate: courses.findOne({ _id: props.courseid }, {sort: {'evaluate.star': -1}}).evaluate || []   
    }
})(Comment);